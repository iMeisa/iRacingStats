package main

import (
	"database/sql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
	"github.com/iMeisa/errortrace"
	"github.com/iMeisa/iRacingStats/server/dbDriver"
	"github.com/joho/godotenv"
	"log"
	"os"
)

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

	// Configure app
	app.Static("/", "./client/dist")

	// Routing
	app.Route("/", Routes)

	// Connect to db
	log.Println("Connecting to DB...")
	db, trace := dbDriver.ConnectSQL(os.Getenv("DBNAME"))
	if trace.HasError() {
		trace.Read()
		log.Fatal()
	}
	//Close connection
	defer func(SQL *sql.DB) {
		err := SQL.Close()
		if err != nil {
			trace = errortrace.NewTrace(err)
			trace.Read()
		}
	}(db.SQL)
	log.Println("Connected to DB")

	// Start app
	err := app.Listen(os.Getenv("SITE_PORT"))
	if err != nil {
		log.Fatal(err)
	}

}
