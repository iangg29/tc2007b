FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
ENV NODE_ENV "$NODE_ENV"
RUN npm set-script prepare "" && npm ci --omit=dev
RUN npm install -g knex
RUN knex migrate:latest --env $NODE_ENV
RUN npm run build
WORKDIR /usr/src/app/build
EXPOSE 8080
CMD ["node", "server.js"]
