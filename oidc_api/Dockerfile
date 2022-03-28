### Build
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /app

COPY . ./

RUN dotnet publish OidcApi --configuration Release --output ./out

### Deploy
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final

ARG COMMIT_SHA=none
LABEL org.opencontainers.image.authors="Christoph Bühler <cbuehler@rootd.ch>" \
    org.opencontainers.image.url="https://github.com/WirePact/demo-applications" \
    org.opencontainers.image.documentation="https://github.com/WirePact/demo-applications/oidc_api" \
    org.opencontainers.image.source="https://github.com/WirePact/demo-applications/blob/main/oidc_api/Dockerfile" \
    org.opencontainers.image.version="latest" \
    org.opencontainers.image.revision="${COMMIT_SHA}" \
    org.opencontainers.image.licenses="Apache-2.0" \
    org.opencontainers.image.title="OIDC API" \
    org.opencontainers.image.description="OpenID Connect capable API that uses token introspection to authenticate user calls."

WORKDIR /app

COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://0.0.0.0:5000

ENTRYPOINT [ "dotnet" ]
CMD [ "OidcApi.dll" ]
