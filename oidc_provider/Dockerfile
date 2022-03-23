FROM node:16-alpine as build

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm ci

COPY ./src ./src
RUN npm run build

FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=production \
    ISSUER="" \
    PROYX=false \
    PORT=3001

COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --production
COPY --from=build /app/build ./build

ENTRYPOINT [ "npm", "start" ]
