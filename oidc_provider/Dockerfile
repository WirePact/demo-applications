FROM node:21-alpine as build

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm ci

COPY ./src ./src
RUN npm run build

FROM node:21-alpine

ARG COMMIT_SHA=none
LABEL org.opencontainers.image.authors="Christoph Bühler <cbuehler@rootd.ch>" \
    org.opencontainers.image.url="https://github.com/WirePact/demo-applications" \
    org.opencontainers.image.documentation="https://github.com/WirePact/demo-applications/oidc_provider" \
    org.opencontainers.image.source="https://github.com/WirePact/demo-applications/blob/main/oidc_provider/Dockerfile" \
    org.opencontainers.image.version="latest" \
    org.opencontainers.image.revision="${COMMIT_SHA}" \
    org.opencontainers.image.licenses="Apache-2.0" \
    org.opencontainers.image.title="OIDC Provider" \
    org.opencontainers.image.description="OpenID Connect demo provider to help development of WirePact components."

WORKDIR /app

ENV NODE_ENV=production \
    ISSUER="" \
    PROYX=false \
    PORT=3001

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --production
COPY --from=build /app/build ./build

ENTRYPOINT [ "npm", "start" ]
