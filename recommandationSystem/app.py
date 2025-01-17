from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import vstack, csr_matrix
import math

app = FastAPI()

# Add this middleware to your app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "http://localhost:3000"],  # Replace "*" with specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all HTTP headers
)

# Pydantic models for structured response
class JobResponse(BaseModel):
    id: str
    description: str
    category: str
    min_price: float
    max_price: float

class AgentRecommendation(BaseModel):
    agent_id: str
    description: str
    category: str
    price: float

class RecommendationEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.jobs_df = pd.DataFrame()
        self.jobs_tfidf = None

    def fetch_agent_data(self):
        url = "http://localhost:4000/api/v1/agents"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            if "agents" in data:
                agents = data["agents"]
                job_list = []
                
                for agent in agents:
                    agent_id = agent.get("_id", "")
                    description = agent.get("description", "")
                    category = agent.get("usecases", [])[0] if agent.get("usecases") else ""
                    price = agent.get("pricePerHour", 0)
                    
                    job_list.append({
                        "agent_id": agent_id,
                        "description": description,
                        "category": category,
                        "price": price,
                    })
                
                return job_list
            else:
                return []
        else:
            return []

    def fetch_job_by_id(self, job_id):
        url = f"http://localhost:4000/api/v1/job/{job_id}"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            if "job" in data:
                job = data["job"]
                return {
                    "id": job.get("_id", ""),
                    "description": job.get("description", ""),
                    "category": job.get("category", ""),
                    "min_price": job.get("payment", {}).get("minimumPay", 0),
                    "max_price": job.get("payment", {}).get("maximumPay", 0)
                }
        return {}

    def remove_job(self, job_id):
        if self.jobs_df.empty:
            return
            
        job_index = self.jobs_df[self.jobs_df["id"] == job_id].index
        if job_index.empty:
            return
        
        job_index_value = job_index[0]
        self.jobs_df = self.jobs_df.drop(job_index).reset_index(drop=True)
        
        if self.jobs_tfidf is not None:
            mask = np.ones(self.jobs_tfidf.shape[0], dtype=bool)
            mask[job_index_value] = False
            self.jobs_tfidf = csr_matrix(self.jobs_tfidf[mask])

    def recommend_agents_for_job(self, job_id, base_min_similarity=0.4, base_diff_threshold=0.2):
        # Fetch data
        agent_data = self.fetch_agent_data()
        job_post = self.fetch_job_by_id(job_id)
        
        if not job_post:
            raise HTTPException(status_code=404, detail="Job not found.")
        
        # Create DataFrames
        agents_df = pd.DataFrame(agent_data)
        self.jobs_df = pd.DataFrame([job_post])

        # Prepare texts with category boosting
        agents_texts = agents_df["description"] + " " + (agents_df["category"] + " ") * 5
        jobs_texts = self.jobs_df["description"] + " " + (self.jobs_df["category"] + " ") * 5
        all_texts = pd.concat([agents_texts, jobs_texts])

        # Create TF-IDF matrices
        tfidf_matrix = self.vectorizer.fit_transform(all_texts)
        agents_tfidf = tfidf_matrix[:len(agents_df)]
        self.jobs_tfidf = tfidf_matrix[len(agents_df):]

        # Add new job
        new_job_text = job_post["description"] + " " + (job_post["category"] + " ") * 5
        new_job_tfidf = self.vectorizer.transform([new_job_text])
        self.jobs_tfidf = vstack([self.jobs_tfidf, new_job_tfidf])
        
        # Calculate similarities
        job_index = self.jobs_tfidf.shape[0] - 1
        job_vector = self.jobs_tfidf[job_index]
        similarities = cosine_similarity(job_vector, agents_tfidf).flatten()
        agents_df["similarity"] = similarities

        # Filter eligible agents
        eligible_agents = agents_df[
            (agents_df["price"] >= job_post["min_price"]) & 
            (agents_df["price"] <= job_post["max_price"])
        ]
        
        if eligible_agents.empty:
            return {"message": "No agents fit the price range.", "recommendations": []}

        # Sort and prepare recommendations
        recommendations = eligible_agents.sort_values(by="similarity", ascending=False)
        
        # Calculate adaptive thresholds
        max_similarity = recommendations.iloc[0]["similarity"]
        similarity_spread = max_similarity - recommendations.iloc[-1]["similarity"]
        spread_factor = math.tanh(similarity_spread * 2)
        max_factor = math.tanh(max_similarity * 2)
        
        adaptive_min_similarity = base_min_similarity * (1 + (spread_factor * 0.2) - (max_factor * 0.2))
        adaptive_min_similarity = max(
            min(adaptive_min_similarity, base_min_similarity * 1.2),
            base_min_similarity * 0.8
        )

        num_eligible = len(recommendations)
        adaptive_diff_threshold = base_diff_threshold * (1 + math.log(num_eligible + 1)) ** (-0.4)
        adaptive_threshold = math.floor((max_similarity - adaptive_diff_threshold) / 0.05) * 0.05
        
        qualified_agents = recommendations[
            (recommendations["similarity"] >= adaptive_min_similarity) &
            (recommendations["similarity"] >= adaptive_threshold)
        ]

        # Get top 3 recommendations
        recommended_agents = recommendations[["agent_id", "description", "category", "price"]].head(3).to_dict(orient="records")
        
        # Remove the processed job
        self.remove_job(job_id)
        
        return {"message": "Recommended agents:", "recommendations": recommended_agents}

# Initialize the recommendation engine
recommendation_engine = RecommendationEngine()

@app.get("/api/v1/suggest_agents/{job_id}", response_model=dict)
async def suggest_agents_for_job(job_id: str):
    try:
        recommendations = recommendation_engine.recommend_agents_for_job(job_id)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)