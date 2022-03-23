### Build
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app

COPY . ./

RUN dotnet publish OidcApi --configuration Release --output ./out

### Deploy
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final

WORKDIR /app

COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://0.0.0.0:5000

ENTRYPOINT [ "dotnet" ]
CMD [ "OidcApi.dll" ]
