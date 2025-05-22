FROM nginx:stable-alpine-alpine3-19-slim
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY static /usr/share/nging/html
