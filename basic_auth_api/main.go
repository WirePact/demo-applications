package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
	"wirepact.ch/basic-auth-api/config"
)

func main() {
	port := config.Port

	fmt.Printf("Starting API server on port %d.\n", port)

	router := gin.Default()
	secure := router.Group("/", gin.BasicAuth(gin.Accounts{
		config.Username: config.Password,
	}))
	secure.GET("swapi/people", getPeopleFromSwapi)
	router.OPTIONS("/swapi/people", cors)

	err := router.Run(fmt.Sprintf(":%v", port))
	if err != nil {
		panic("Could not start server.")
	}
}

const swapiUrl = "https://swapi.dev/api/people"

func cors(context *gin.Context) {
	context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	context.Writer.Header().Set("Access-Control-Allow-Methods", "*")
	context.Writer.Header().Set("Access-Control-Allow-Headers", "*")
	context.Writer.Header().Set("Access-Control-Max-Age", "3600")
	context.Status(http.StatusNoContent)
}

func getPeopleFromSwapi(context *gin.Context) {
	context.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	request, _ := http.NewRequest("GET", swapiUrl, nil)
	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		_ = context.AbortWithError(response.StatusCode, err)
		return
	} else if response.StatusCode > 299 {
		context.AbortWithStatus(response.StatusCode)
		return
	}

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		_ = context.AbortWithError(response.StatusCode, err)
		return
	}

	var result Result
	if err = json.Unmarshal(body, &result); err != nil {
		_ = context.AbortWithError(response.StatusCode, err)
		return
	}

	context.JSON(http.StatusOK, result)
}

type Result struct {
	Results []Person `json:"results"`
}

type Person struct {
	Name      string `json:"name"`
	Gender    string `json:"gender"`
	HairColor string `json:"hair_color"`
	EyeColor  string `json:"eye_color"`
	BirthYear string `json:"birth_year"`
}
