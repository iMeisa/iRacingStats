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
	resp := jsonResponse{
		Ok: false,
	}

	tableName := ctx.Params("table")
	query, trace := a.DB.Query(tableName, ctx.Queries())
	if trace.HasError() {
		fmt.Println(trace)
		resp.Msg = trace.ErrorString()
		return ctx.JSON(resp)
	}

	return ctx.JSON(query)
}

//func Post(w http.ResponseWriter, r *http.Request) {
//	w.Write([]byte("post no worky"))
//}
