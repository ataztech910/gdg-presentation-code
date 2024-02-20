package main

import (
	"log"
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./static")))
	log.Println("Server started at 8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
