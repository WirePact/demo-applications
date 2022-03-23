# WirePact Applications

This repository contains various demo/showcase applications for WirePact.
The applications are used during development of translators and for
the end-to-end demo. They vary in terms of programming language
and flavor to show that neither the framework nor the programming language
limits the use case of WirePact.

**Note** that these applications are not meant for production!

## Flavors/Applications

### OIDC Provider

This application serves as "login" point for demo applications that use OIDC.
It is a custom web app with the [node-oidc-provider](https://github.com/panva/node-oidc-provider)
package to deliver OIDC login capabilities. This serves as an
alternative to ["Keycloak"](https://www.keycloak.org/)
or other OIDC provider pre-built software, which tend to
have longer startup times for development.

[OIDC Provider](./oidc_provider)

### App with Basic Auth

### App with OIDC

The "OIDC client application" provides a Next.js application that uses NextAuth
to authenticate the user against the [OIDC Provider](./oidc_provider).
As mentioned, to log in, you may use any username/password combination
since the provider accepts arbitrary input.

Once you are logged in, you can enter an API url that the app shall
send an HTTP GET request to. The result is then displayed in the
web application.

[OIDC Client Application](./oidc_app/)

### API with Basic Auth

### API with OIDC

The "OIDC API" is a dotnet (.net6.0) application that uses
OIDC (more specifically OAuth2.0Introspection) authentication
to check if a user may or may not access the API. The API has
one endpoint (`/swapi/people`) that returns the first ten people from the
[Star Wars API](https://swapi.dev/).

[OIDC API](./oidc_api/)
