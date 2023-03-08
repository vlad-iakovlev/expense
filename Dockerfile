FROM node:16

RUN apt-get update && apt-get -y install cron

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm ci
COPY . .
RUN npm run generate-models
RUN npm run build
RUN npm prune --production

RUN crontab -l | { cat; echo "0 */6 * * * npm run update-rates"; } | crontab -

CMD [ "npm", "start" ]
