package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/iMeisa/iRacingStats/server/api"
)

func home(ctx *fiber.Ctx) error {
	return ctx.Render("index", fiber.Map{})
}

func Routes(router fiber.Router) {

	router.Get("/:page", home)

	router.Route("/api", func(router fiber.Router) {

		// API GET routes
		router.Get("/:action", api.Get)

		// API POST routes
		//router.Post("/{api-post}/{action}", api.Post)

	})
}
