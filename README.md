# Instructions to run the application in local

I have pushed the docker images to my dockerhub respostories and made it public

We can run this application in mulitple ways with & without using docker. Below are the instructions for 2 ways:

## Pull my docker image and run using Docker

- Download Docker if it is not installed in your system and install it
- Start/Open the Docker
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

- To stop this, Run "docker-compose down"

## Clone & run the application in the local

- Clone this Repo
- In the terminal, Go to the backend/becompanyportal
- Run "python3 manage.py runserver"
    - This will start the backend development server at http://127.0.0.1:8000/
- open new terminal tab
- Go to the frontend/company-portal
- Run "npm install"
- Run "npm run dev"
    - This will start the frontend development server at http://localhost:5173/

