package main

import (
	"database/sql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/template/html/v2"
	"github.com/iMeisa/errortrace"
	apiDriver "github.com/iMeisa/iRacingStats/server/api"
	"github.com/iMeisa/iRacingStats/server/db"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var api apiDriver.Api

func main() {

	// Load env file
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}

	engine := html.New("./client/dist", ".html")

	// Create app
	app := fiber.New(fiber.Config{
		Views: engine,
	})

	// Allow cors development
	app.Use(cors.New(cors.Config{
		AllowOriginsFunc: func(origin string) bool {
			return os.Getenv("ENV") == "dev"
		},
	}))

	// Configure app
	app.Static("/", "./client/dist")

	// Routing
	app.Route("/", Routes)

	// Connect to db
	log.Println("Connecting to DB...")
	dbConnection, trace := db.ConnectSQL(os.Getenv("DBNAME"))
	if trace.HasError() {
		trace.Read()
		log.Fatal()
	}
	// Add connection to API
	api.DB = dbConnection
	// Close connection on shutdown
	defer func(SQL *sql.DB) {
		err := SQL.Close()
		if err != nil {
			trace = errortrace.NewTrace(err)
			trace.Read()
		}
	}(dbConnection.SQL)
	log.Println("Connected to DB")

	// Start app
	err := app.Listen(os.Getenv("SITE_PORT"))
	if err != nil {
		log.Fatal(err)
	}

}
