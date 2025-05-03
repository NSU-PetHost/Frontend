FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "start", "--host", "0.0.0.0", "--port", "4444"]
