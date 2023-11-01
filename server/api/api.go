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
	case "sessions":
		query = a.DB.Sessions()

	case "session":

		sessionId, err := strconv.Atoi(ctx.Query("session_id"))
		if err != nil {
			log.Println("parsing session_id: ", err)
		}

		query = a.DB.Subsessions(sessionId)

	default:
		query, _ = a.DB.Query(tableName, ctx.Queries())
	}

	return ctx.JSON(query)
}

//func Post(w http.ResponseWriter, r *http.Request) {
//	w.Write([]byte("post no worky"))
//}
