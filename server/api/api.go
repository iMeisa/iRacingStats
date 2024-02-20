package api

import (
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
	//	Ok: false,
	//}

	tableName := ctx.Params("table")

	var query interface{}

	switch tableName {
	case "content_cache":
		query = a.DB.ContentCache(ctx.Query("content_name"))

	case "content_cache_hash":
		hash := a.DB.ContentCacheHash(ctx.Query("content_name"))
		return ctx.SendString(hash)

	case "count":
		query = a.DB.QueryCount(ctx.Query("table"))

	case "customers":
		query = a.DB.Users(ctx.Query("display_name"))

	case "data_range":
		query = a.DB.DataRange()

	case "driver":
		query = a.DB.DriverInfo(ctx.QueryInt("cust_id"))

	case "driver_data":
		query = a.DB.DriverData(ctx.QueryInt("id"))

	case "series":
		query = a.DB.Series(ctx.QueryInt("id"), ctx.QueryBool("active"))

	case "series_popularity":
		query = a.DB.SeriesPopularity()

	case "series_sessions":
		query = a.DB.SeriesSessions(ctx.QueryInt("id"))

	case "sessions":
		query = a.DB.Sessions()

	case "session":
		query = a.DB.Subsessions(ctx.QueryInt("session_id"))

	case "subsession_results":
		query = a.DB.SubsessionResults(ctx.QueryInt("id"))

	case "visit":
		a.DB.AddPageVisit(ctx.Query("page"))

	default:
		query, _ = a.DB.Query(tableName, ctx.Queries())
	}

	a.DB.AddPageVisit("/api")
	return ctx.JSON(query)
}

//func Post(w http.ResponseWriter, r *http.Request) {
//	w.Write([]byte("post no worky"))
//}
