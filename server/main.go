package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

//type Todo struct {
//	ID    int    `json:"id"`
//	Title string `json:"title"`
//	Done  bool   `json:"done"`
//	Body  string `json:"body"`
//}

func main() {
	fmt.Println("Hello World")

	http.Handle("/", http.FileServer(http.Dir("./client/dist")))
	if err := http.ListenAndServe(os.Getenv("SITE_PORT"), nil); err != nil {
		log.Panic(err)
	}

	//app := fiber.New()
	//
	//app.Use(cors.New(cors.Config{
	//	AllowOrigins: "http://localhost:3000",
	//	AllowHeaders: "Origin, Content-Type, Accept",
	//}))
	//
	//var todos []Todo
	//
	//app.Get("/", func(ctx *fiber.Ctx) error {
	//	return ctx.SendString("OK")
	//})
	//
	//app.Post("/api/todos", func(ctx *fiber.Ctx) error {
	//	todo := &Todo{}
	//
	//	if err := ctx.BodyParser(todo); err != nil {
	//		return err
	//	}
	//
	//	todo.ID = len(todos) + 1
	//
	//	todos = append(todos, *todo)
	//
	//	return ctx.JSON(todos)
	//})
	//
	//app.Patch("/api/todos/:id/done", func(ctx *fiber.Ctx) error {
	//	id, err := ctx.ParamsInt("id")
	//	if err != nil {
	//		return ctx.Status(401).SendString("Invalid id")
	//	}
	//
	//	for index, todo := range todos {
	//		if todo.ID == id {
	//			todos[index].Done = true
	//			break
	//		}
	//	}
	//
	//	return ctx.JSON(todos)
	//})
	//
	//app.Get("/api/todos", func(ctx *fiber.Ctx) error {
	//	return ctx.JSON(todos)
	//})
	//
	//log.Fatal(app.Listen(":8080"))
}
