# Screenshots of the application:

- Company List Page

  <img width="736" alt="image" src="https://github.com/user-attachments/assets/2224882a-d993-470b-a50e-73bb79fb5b47">

  Search functionality to find companies by name

  ![image](https://github.com/user-attachments/assets/f275caba-4130-4d4f-89f4-6c6438e32931)

- Company Details Page
  
  ![image](https://github.com/user-attachments/assets/28e82cca-5817-4d5a-aa50-a3f7e72abeb4)

  Popup to show the details of the marker in the map

  ![image](https://github.com/user-attachments/assets/65cabac3-96fe-4d03-839e-8a5492f13a69)

  Chart - Comparison of distance b/w locations

  ![image](https://github.com/user-attachments/assets/920baae6-e352-4a2a-be5d-f7e533127885)

# Swagger Documentations

  ![image](https://github.com/user-attachments/assets/bd7076d4-167f-4c09-91d0-e6793bf552b2)

# Instructions to run the application in local

I have pushed the docker images to my dockerhub respostories and made it public

We can run this application in mulitple ways with & without using docker. Below are the instructions for 3 different ways:

## 1st - Optimal Number of Steps to make the app up & running to check in browser

- Clone this Repo
- make sure you are in the root of this project where the docker-compose.yaml file exists
- Start/Open the Docker (i.e Docker Desktop to start the docker daemon running)
  -  Note - make sure docker & docker-compose installed in your system.
- Run this command in the terminal in root path of this repo
  - "docker-compose up"
- Application will start run at http://localhost:5173/
- Swagger API documentation runs at http://localhost:8000/swagger/

- To stop this, Run "docker-compose down"


## 2nd - Pull my docker image from my dockerhub repository and run using Docker

- Download Docker (i.e Docker Desktop) if it is not installed in your system and install it.
  - Ensure Docker & Docker Desktop installed in your system.
- Start/Open the Docker (i.e Docker Desktop)
- Create a docker-compose.yaml file
- copy & paste the below yaml configuration

```
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

## 3rd - Clone & run the application in the local

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



