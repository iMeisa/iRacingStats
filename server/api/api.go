package api

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/iMeisa/iRacingStats/server/db"
)

type Api struct {
	DB *db.DB
}

type jsonResponse struct {
	Ok  bool   `json:"ok"`
	Msg string `json:"msg"`
}

func (a *Api) Get(ctx *fiber.Ctx) error {
	//resp := jsonResponse{
	//	Ok:  true,
	//	Msg: "Hello",
	//}

	query, trace := a.DB.Query("customers", 1)
	if trace.HasError() {
		fmt.Println(trace)
	}

	return ctx.JSON(query)
}

//func Post(w http.ResponseWriter, r *http.Request) {
//	w.Write([]byte("post no worky"))
//}
