# Custom OIDC Provider

This application serves OIDC provider capabilities for development of
translators and WirePact itself. The application is configured
by default and is intended for development of WirePact
components. Therefore, it mustn't be used in production settings.

When you're prompted to enter user information, you may insert
any username and password that you can imagine. The provider
will accept any input and create an opaque access token for you.

## Configuration

The provider may be configured via three environment variables:

- `ISSUER`: The name of the issuer. This is typically the "public" url
  of your provider. This defaults to `http://localhost{PORT}`.
- `PROXY`: If set to "true", this enables the oidc provider to run
  behind a TLS terminating proxy. For development, you won't need this
  feature.
- `PORT`: The port that the provider runs on.

### OIDC Clients

There are two OIDC clients configured, which both
use the authorization code flow.

One with PKCE disabled, so you actually
need the client secret.

```javascript
const client = {
  client_id: 'wirepact',
  client_secret: 'secret',
};
```

One with PKCE enabled.

```javascript
const client = {
  client_id: 'wirepact-pkce',
};
```

## Deployment

To use the OIDC provider, you may:

- Clone the repo and build the Docker image by yourself.
- Copy paste the parts that you need from the [docker-compose file](../docker-compose.yml).
- Use the published Docker image from github in your docker compose file,
  as shown in [the example](./docker-compose-example.yml).

## Example

A configuration example from [the oidc_api](../oidc_api/) to configure
the OAuth2Intropect authentication-handler:

```c#
builder.Services
    .AddAuthentication("token")
    .AddOAuth2Introspection("token", o =>
    {
        var section = builder.Configuration.GetSection("Oidc");
        o.Authority = section.GetValue<string>("Issuer");
        o.ClientId = section.GetValue<string>("ClientId");
        o.ClientSecret = section.GetValue<string>("ClientSecret");
    });

// ...

app.UseAuthentication();
app.UseAuthorization();
```

And then for configuration you may use environment variables
or the json file (`appsettings.json`).
