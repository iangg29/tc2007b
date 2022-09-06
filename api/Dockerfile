FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
ARG DOCKER_ENV
ENV NODE_ENV = ${DOCKER_ENV}
RUN npm set-script prepare "" && npm ci --omit=dev
RUN npm install -g knex
RUN knex migrate:latest --env $DOCKER_ENV
RUN npm run build
WORKDIR /usr/src/app/build
EXPOSE 8080
CMD ["node", "server.js"]
