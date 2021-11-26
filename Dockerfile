FROM node:14-stretch-slim as builder-stage
WORKDIR /app
COPY . /app
RUN npm cache clean --force
RUN npm install
RUN npm install --save vue-container-query
RUN npm run build:staging


FROM nginx:latest
COPY --from=builder-stage /app/dist /usr/share/nginx/html