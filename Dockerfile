FROM node:20

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

CMD npm run start:prod
