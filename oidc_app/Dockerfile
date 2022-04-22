FROM node:18-alpine

ARG COMMIT_SHA=none
LABEL org.opencontainers.image.authors="Christoph Bühler <cbuehler@rootd.ch>" \
    org.opencontainers.image.url="https://github.com/WirePact/demo-applications" \
    org.opencontainers.image.documentation="https://github.com/WirePact/demo-applications/oidc_app" \
    org.opencontainers.image.source="https://github.com/WirePact/demo-applications/blob/main/oidc_app/Dockerfile" \
    org.opencontainers.image.version="latest" \
    org.opencontainers.image.revision="${COMMIT_SHA}" \
    org.opencontainers.image.licenses="Apache-2.0" \
    org.opencontainers.image.title="OIDC App" \
    org.opencontainers.image.description="OpenID Connect capable NextJS application that uses the OIDC provider for authentication."

WORKDIR /app

COPY ./package-lock.json ./package.json ./
RUN npm ci

COPY ./.eslintrc.json ./next.config.js ./postcss.config.js ./tailwind.config.js ./
COPY ./components ./components
COPY ./pages ./pages
COPY ./public ./public
COPY ./styles ./styles

ENV OIDC_ISSUER="" \
    OIDC_CLIENT_ID="" \
    OIDC_CLIENT_SECRET="" \
    API_URL=""

RUN npm run build

ENTRYPOINT [ "npm", "start" ]
