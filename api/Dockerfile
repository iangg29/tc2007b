FROM node:16-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm set-script prepare "" && npm ci --omit=dev
RUN npm run build
WORKDIR /usr/src/app/build
EXPOSE 8080
CMD ["node", "server.js"]