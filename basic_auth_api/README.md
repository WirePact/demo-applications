# Basic Auth API

This is an API application that uses
[HTTP Basic Authentication (RFC7617)](https://tools.ietf.org/html/rfc7617)
to authenticate and/or reject calls against itself.

The API does support exactly one call: `<HOST>/swapi/people`,
which calls the [Star Wars API](https://swapi.dev/) and returns the
first ten people in the result.

## Configuration

To configure the API, you can use the following environment variables:

- `PORT`: The port on which the API server listens for connections (Default `3030`).
- `AUTH_USERNAME`: The username for Basic Authentication (Default `user`).
- `AUTH_PASSWORD`: The password for Basic Authentication (Default `pass`).

## Deployment

To use the Basic Auth API, you may:

- Clone the repo and build the Docker image by yourself.
- Copy paste the parts that you need from the [docker-compose file](../docker-compose.yml).
- Use the published Docker image from github in your docker compose file,
  as shown in [the example](./docker-compose-example.yml).
