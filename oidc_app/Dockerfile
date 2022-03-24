FROM node:16-alpine

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
