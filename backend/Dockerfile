FROM node:18
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install
COPY . .
# Expose port 4000 to the host
EXPOSE 4000

# Define environment variables (optional)
ENV PORT=4000
# replace localhost with container name   
ENV DB_URI=mongodb://localhost:27017/mydatabase   
ENV FRONTEND=http://frontend:3000
CMD ["node", "server.js"]