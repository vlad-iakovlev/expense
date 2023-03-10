FROM node:16

RUN apt-get update && apt-get -y install cron supervisor

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run generate-models
RUN npm run build
RUN npm prune --production

RUN echo "0 */6 * * * root npm run update-rates >/dev/stdout 2>/dev/stderr" >> /etc/crontab

CMD [ "/usr/bin/supervisord" ]
