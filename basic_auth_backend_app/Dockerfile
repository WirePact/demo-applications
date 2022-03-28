### Build
FROM mcr.microsoft.com/dotnet/sdk:latest AS build

WORKDIR /app

COPY . ./

RUN dotnet publish BasicAuthApp --configuration Release --output ./out

### Deploy
FROM mcr.microsoft.com/dotnet/aspnet:latest AS final

ARG COMMIT_SHA=none
LABEL org.opencontainers.image.authors="Christoph Bühler <cbuehler@rootd.ch>" \
    org.opencontainers.image.url="https://github.com/WirePact/demo-applications" \
    org.opencontainers.image.documentation="https://github.com/WirePact/demo-applications/basic_auth_backend_app" \
    org.opencontainers.image.source="https://github.com/WirePact/demo-applications/blob/main/basic_auth_backend_app/Dockerfile" \
    org.opencontainers.image.version="latest" \
    org.opencontainers.image.revision="${COMMIT_SHA}" \
    org.opencontainers.image.licenses="Apache-2.0" \
    org.opencontainers.image.title="Basic Auth App (Backend)" \
    org.opencontainers.image.description="Application that uses Basic Auth (RFC7617) to authenticate calls and accesses the API via backend call."

WORKDIR /app

COPY --from=build /app/out .

ENV PORT=5000

ENTRYPOINT [ "dotnet" ]
CMD [ "BasicAuthApp.dll" ]
