FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install -g knex
RUN npm set-script prepare "knex migrate:latest --env development" && npm ci --omit=dev
RUN npm run build
WORKDIR /usr/src/app/build
EXPOSE 8080
CMD ["node", "server.js"]
