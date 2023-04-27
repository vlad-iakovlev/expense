FROM node:18

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run generate-models
RUN npm run migrations:apply-all
RUN npm run build

CMD npm start
