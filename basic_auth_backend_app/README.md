# Basic Auth Backend App

This is a "hosted" application that uses
[HTTP Basic Authentication (RFC7617)](https://tools.ietf.org/html/rfc7617)
to authenticate calls to a given API.

The application is served as a .NET Razor Pages application that
uses static sites to serve the app. The form fiels are prefilled
with the given environment variables. The app the utilizes a
post-back form (http form) to execute the basic auth request to the API.

## Configuration

To configure the app, you can use the following environment variables:

- `PORT`: The port on which the app listens for connections (Default `5000`).
- `AUTH_USER`: The username for Basic Authentication for pre-filling.
- `AUTH_PASS`: The password for Basic Authentication for pre-filling.
- `API_URL`: The url for the api call for pre-filling.

## Deployment

To use the Basic Auth Backend App, you may:

- Clone the repo and build the Docker image by yourself.
- Copy paste the parts that you need from the [docker-compose file](../docker-compose.yml).
- Use the published Docker image from github in your docker compose file,
  as shown in [the example](./docker-compose-example.yml).
