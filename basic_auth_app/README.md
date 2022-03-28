# Basic Auth App

This is a simple html application that uses
[HTTP Basic Authentication (RFC7617)](https://tools.ietf.org/html/rfc7617)
to authenticate calls to a given API.

The application is hosted within an NGINX instance and can be configured
via environment variables. The variables are replaced with `envsubst`
at the start of the application.

The credentials and api url env variable are fetched upon startup and
are filled into their respective form fields.

## Configuration

To configure the app, you can use the following environment variables:

- `PORT`: The port on which NGINX listens for connections (Default `8080`).
- `AUTH_USER`: The username for Basic Authentication for pre-filling.
- `AUTH_PASS`: The password for Basic Authentication for pre-filling.
- `API_URL`: The url for the api call for pre-filling.

## Deployment

To use the Basic Auth App, you may:

- Clone the repo and build the Docker image by yourself.
- Copy paste the parts that you need from the [docker-compose file](../docker-compose.yml).
- Use the published Docker image from github in your docker compose file,
  as shown in [the example](./docker-compose-example.yml).
