FROM node:alpine as build

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

#---

FROM caddy:2-alpine

COPY --from=build /app/build /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
