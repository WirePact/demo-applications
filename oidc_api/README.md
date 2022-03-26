# OIDC API

This is an API application that uses the [OIDC provider](../oidc_provider/)
with [OAuth2.0Introspection](https://github.com/IdentityModel/IdentityModel.AspNetCore.OAuth2Introspection)
to authenticate a user with an opaque `access token` from the provider.

The API does support exactly one call: `<HOST>/swapi/people`,
which calls the [Star Wars API](https://swapi.dev/) and returns the
first ten people in the result.

OIDC Introspection is defined in [RFC7662](https://datatracker.ietf.org/doc/html/rfc7662)
and allows an API to accept opaque `access tokens`. Some systems (dotnet as well)
can validate `JWT` tokens out of the box but do not support introspection.

## Configuration

To configure the API, you can use the following environment variables (**note** the double underscores `_` which is the default delimiter for objects in dotnet environment variables):

- `OIDC__ISSUER`: Configure the issuer (most likely the host url of the [OIDC provider](../oidc_provider/)).
- `OIDC__CLIENTID`: The client id for OIDC authentication.
- `OIDC__CLIENTSECRET`: Client secret for OIDC authentication.
- `ASPNETCORE_URLS`: The url on which the API shall run.
  This must include the port and defaults to `http://0.0.0.0:5000`.

## Deployment

To use the OIDC API, you may:

- Clone the repo and build the Docker image by yourself.
- Copy paste the parts that you need from the [docker-compose file](../docker-compose.yml).
- Use the published Docker image from github in your docker compose file,
  as shown in [the example](./docker-compose-example.yml).
