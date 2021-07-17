FROM node:14-alpine as builder

WORKDIR /app

COPY . .

ENV CI=true \
    GENERATE_SOURCEMAP=false

RUN yarn --check-files &&\
  yarn build

FROM nginx:stable-alpine

COPY --from=builder /app/build/ /usr/share/nginx/html

COPY --from=builder /app/node_modules/@cinimod/docker/react/nginx.conf /etc/nginx/conf.d/default.conf
