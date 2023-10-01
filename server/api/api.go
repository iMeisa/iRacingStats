package api

import (
	"github.com/gofiber/fiber/v2"
)

type jsonResponse struct {
	Ok  bool   `json:"ok"`
	Msg string `json:"msg"`
}

func Get(ctx *fiber.Ctx) error {
	resp := jsonResponse{
		Ok:  true,
		Msg: "Hello",
	}
	return ctx.JSON(resp)
}

//func Post(w http.ResponseWriter, r *http.Request) {
//	w.Write([]byte("post no worky"))
//}
