# OIDC API

This is an API application that uses the [OIDC provider](../oidc_provider/)
with [OAuth2.0Introspection](https://github.com/IdentityModel/IdentityModel.AspNetCore.OAuth2Introspection)
to authenticate a user with an opaque `access token` from the provider.

The API does support exactly one call: `<HOST>/swapi/people`,
which calls the [Star Wars API](https://swapi.dev/) and returns the
first ten people in the result.

## Configuration

## Deployment
