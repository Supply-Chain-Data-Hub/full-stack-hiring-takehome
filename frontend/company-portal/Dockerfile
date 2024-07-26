FROM node:20-alpine

WORKDIR /frontend/company-portal

COPY package*.json ./

RUN npm install

ARG VITE_BACKEND_ENDPOINT_URL
ENV VITE_BACKEND_ENDPOINT_URL=$VITE_BACKEND_ENDPOINT_URL

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]