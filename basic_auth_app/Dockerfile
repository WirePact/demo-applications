FROM nginx:mainline-alpine

ARG COMMIT_SHA=none
LABEL org.opencontainers.image.authors="Christoph Bühler <cbuehler@rootd.ch>" \
    org.opencontainers.image.url="https://github.com/WirePact/demo-applications" \
    org.opencontainers.image.documentation="https://github.com/WirePact/demo-applications/basic_auth_app" \
    org.opencontainers.image.source="https://github.com/WirePact/demo-applications/blob/main/basic_auth_app/Dockerfile" \
    org.opencontainers.image.version="latest" \
    org.opencontainers.image.revision="${COMMIT_SHA}" \
    org.opencontainers.image.licenses="Apache-2.0" \
    org.opencontainers.image.title="Basic Auth App" \
    org.opencontainers.image.description="App that uses HTTP Basic Authentication (RFC7617) to authenticate the calls to an API."

ENV PORT=8080 \
    API_URL="" \
    AUTH_USER="" \
    AUTH_PASS=""

WORKDIR /app

COPY ./main.js ./index.html ./
COPY ./nginx.conf /etc/nginx/templates/app.conf.template
