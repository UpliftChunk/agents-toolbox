> NOTE: fill the config file (path: backend/config/config.env) with cloudinary keys for image storing operations

1. ### Build and Run the Application
Run the following command to build and start the application using Docker Compose:
```
docker compose up --build
```
This command will build the Docker images for both the frontend and backend, then start the containers.

2. ### Access the Application

- Frontend: Open your web browser and navigate to http://localhost:3000.

- Backend: The backend service will be running on http://localhost:4000.

- Database: The backend service will be running on http://localhost:27017.

#### Stopping the Application
To stop the application, press CTRL+C in the terminal where the containers are running. If you want to remove the containers and their networks, run:
```
docker compose down
```
