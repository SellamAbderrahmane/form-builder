FROM node:16.16.0-alpine as node
WORKDIR /form-builder
COPY . /form-builder/

RUN npm i
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /form-builder/dist /usr/share/nginx/html
