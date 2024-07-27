# Instructions to run the application in local

I have pushed the docker images to my dockerhub respostories and made it public

We can run this application in mulitple ways with & without using docker. Below are the instructions for 2 ways:

## Pull my docker image and run using Docker (Optimal Step to make the app up & running to check in browser)

- Download Docker (i.e Docker Desktop) if it is not installed in your system and install it.
  - Ensure Docker & Docker Desktop installed in your system.
- Start/Open the Docker (i.e Docker Desktop)
- Create a docker-compose.yaml file
- copy & paste the below yaml configuration

```
version: '3.8'

services:
  backend:
    image: gsprasanna/python-backend:latest
    ports:
      - "8000:8000"

  frontend:
    image: gsprasanna/my-react-app:latest
    ports:
      - "5173:5173"
    depends_on:
      - backend
```
- Go to the path of this directory where you created the docker-compose.yaml file
- Run "docker-compose up"

- Application will start run at http://localhost:5173/
- Swagger API documentation runs at http://localhost:8000/swagger/

- To stop this, Run "docker-compose down"

- Additional Info (My DockerHub Profile URL) - https://hub.docker.com/u/gsprasanna

## Clone & run the application in the local

- Clone this Repo in vs code
- open terminal tab
- Go to the frontend/company-portal
- create a .env file under frontend/company-portal
  - add this variable (make sure the key value is correct)
      VITE_BACKEND_ENDPOINT_URL = http://127.0.0.1:8000/api/
- Run "npm install"
- Run "npm run dev"
    - This will start the frontend development server at http://localhost:5173/
  
- In the new terminal, Go to the backend/becompanyportal
- since Django 5 requires python 3.10 plus. upgrade the python to latest (eg : 3.12.3)
    - (Note: make sure python path is configured in system path variables);
- check if pip3 is intalled in your install. if not make sure it is installed.
- Run "pip3 install --no-cache-dir -r requirements.txt"
    - (Note: if above command is having issue. try below command without quotes
        "pip3 install --no-cache-dir -r requirements.txt --break-system-packages")
- Run "python3 manage.py runserver"
    - This will start the backend development server at http://127.0.0.1:8000/
- Swagger API documentation runs at http://127.0.0.1:8000/swagger/



