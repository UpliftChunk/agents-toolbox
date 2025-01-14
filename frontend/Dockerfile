# # Stage 1: Build Stage
# FROM node:18-alpine AS build

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app for production
# RUN npm run build

# # Stage 2: Production Stage
# FROM nginx:alpine

# # Set environment variables
# ENV REACT_APP_BACKEND_URL=http://backend:4000

# # Copy build output from the previous stage to NGINX html directory
# COPY --from=build /app/build /usr/share/nginx/html

# # Expose port 3000
# EXPOSE 3000

# # Start NGINX server
# CMD ["nginx", "-g", "daemon off;"]


# Stage 1: Build Stage
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
# ENV REACT_APP_BACKEND_URL=http://backend:4000

# Build the React app for production
# RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start frontend
CMD ["npm", "start"]
