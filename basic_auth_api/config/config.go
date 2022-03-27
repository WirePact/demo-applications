package config

import (
	"os"
	"strconv"
)

var (
	Port     uint16
	Password string
	Username string
)

const (
	envPort         = "PORT"
	envUsername     = "AUTH_USERNAME"
	envPassword     = "AUTH_PASSWORD"
	defaultPort     = 3030
	defaultUsername = "user"
	defaultPassword = "pass"
)

func init() {
	if value, ok := os.LookupEnv(envPort); ok {
		if intValue, err := strconv.Atoi(value); err == nil {
			Port = uint16(intValue)
		} else {
			Port = defaultPort
		}
	} else {
		Port = defaultPort
	}

	if value, ok := os.LookupEnv(envUsername); ok {
		Username = value
	} else {
		Username = defaultUsername
	}

	if value, ok := os.LookupEnv(envPassword); ok {
		Password = value
	} else {
		Password = defaultPassword
	}
}
