package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/iMeisa/iRacingStats/server/db"
	"time"
)

func home(ctx *fiber.Ctx) error {
	return ctx.Render("index", fiber.Map{})
}

func Routes(router fiber.Router) {

	router.Route("/api", func(router fiber.Router) {

		// API GET routes
		router.Get("/:table", api.Get)

		// API POST routes
		//router.Post("/{api-post}/{action}", api.Post)

	})

	router.Get("/:page/*", home)
}

func insertVisits(db *db.DB) {
	for {
		time.Sleep(5 * time.Second)
		db.UpdateVisits()
	}
}
