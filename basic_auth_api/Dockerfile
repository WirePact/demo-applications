FROM golang:1.20-alpine as build

WORKDIR /app

ENV GOOS=linux \
    GOARCH=amd64 \
    USER=appuser \
    UID=1000

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

RUN go build -ldflags="-w -s" -o /go/bin/app


FROM alpine

ARG COMMIT_SHA=none
LABEL org.opencontainers.image.authors="Christoph Bühler <cbuehler@rootd.ch>" \
    org.opencontainers.image.url="https://github.com/WirePact/demo-applications" \
    org.opencontainers.image.documentation="https://github.com/WirePact/demo-applications/basic_auth_api" \
    org.opencontainers.image.source="https://github.com/WirePact/demo-applications/blob/main/basic_auth_api/Dockerfile" \
    org.opencontainers.image.version="latest" \
    org.opencontainers.image.revision="${COMMIT_SHA}" \
    org.opencontainers.image.licenses="Apache-2.0" \
    org.opencontainers.image.title="Basic Auth API" \
    org.opencontainers.image.description="API that uses HTTP Basic Authentication (RFC7617) to authenticate the calls."

WORKDIR /app

ENV GIN_MODE=release

COPY --from=build /etc/passwd /etc/group /etc/
COPY --from=build /go/bin/app /app/app

RUN chown -R appuser:appuser /app

USER appuser:appuser

ENTRYPOINT ["/app/app"]
