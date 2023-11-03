package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/iMeisa/iRacingStats/server/db"
	"log"
	"strconv"
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
	//	Ok: false,
	//}

	tableName := ctx.Params("table")
	//fmt.Println(ctx.Queries())

	var query interface{}

	switch tableName {
	case "count":
		query = a.DB.QueryCount(ctx.Query("table"))

	case "customers":
		query = a.DB.Users(ctx.Query("display_name"))

	case "data_range":
		query = a.DB.DataRange()

	case "series":
		query = a.DB.Series()

	case "sessions":
		query = a.DB.Sessions()

	case "session":

		sessionId, err := strconv.Atoi(ctx.Query("session_id"))
		if err != nil {
			log.Println("parsing session_id: ", err)
		}

		query = a.DB.Subsessions(sessionId)

	case "user":
		query = a.DB.User(ctx.QueryInt("cust_id"))

	default:
		query, _ = a.DB.Query(tableName, ctx.Queries())
	}

	return ctx.JSON(query)
}

//func Post(w http.ResponseWriter, r *http.Request) {
//	w.Write([]byte("post no worky"))
//}
