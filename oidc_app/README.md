# OIDC Application

This is a Next.js application that uses NextAuth to
authenticate against the [OIDC provider](../oidc_provider/).
When opening the app via the configured url (for example
`http://localhost:3000` when run with the
[demo docker compose file](../docker-compose.yml))
you will be forwarded to the login page of the oidc
provider. As mentioned, you may enter any username
and password combination.

Once logged in, the application will show the `access token`
and a form field with a prefilled `API_URL` (from the
environment variable). You can then call the API
via the form and see the result shown beneath the form.

## Configuration

The application can be configured with the following environment variables:

- `OIDC_ISSUER`: Issuer of the OIDC provider that is used.
- `OIDC_CLIENT_ID`: Client ID for the OIDC provider.
- `OIDC_CLIENT_SECRET`: Client Secret for the OIDC provider.
  This is required because NextAuth is not yet able to use
  `pkce` correctly.
- `API_URL`: The url that is pre-filled in the form field.
- `NEXTAUTH_URL`: Url where the app is available when it is behind a proxy.

## Deployment

To use the OIDC app, you may:

- Clone the repo and build the Docker image by yourself.
- Copy paste the parts that you need from the [docker-compose file](../docker-compose.yml).
- Use the published Docker image from github in your docker compose file,
  as shown in [the example](./docker-compose-example.yml).
