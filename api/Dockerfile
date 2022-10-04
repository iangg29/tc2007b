FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm i --ignore-scripts
RUN npm run build
WORKDIR /usr/src/app/build
RUN npm i -g knex
EXPOSE 8080
CMD ["node", "server.js"]
