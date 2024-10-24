package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/iMeisa/iRacingStats/server/db"
)

type Api struct {
	DB *db.DB
}

func (a *Api) Get(ctx *fiber.Ctx) error {

	tableName := ctx.Params("table")

	var query interface{}

	switch tableName {
	case "content_cache":
		query = a.DB.ContentCache(ctx.Query("content_name"))

	case "cache_hashes":
		query = a.DB.CacheHashes()

	case "count":
		query = a.DB.QueryCount(ctx.Query("table"))

	case "customers":
		query = a.DB.Users(ctx.Query("display_name"))

	case "data_range":
		query = a.DB.DataRange()

	case "driver":
		query = a.DB.DriverInfo(ctx.QueryInt("cust_id"))

	case "driver_races":
		query = a.DB.DriverRaces(ctx.QueryInt("id"))

	case "driver_update":
		query = a.DB.DriverUpdate(ctx.QueryInt("cust_id"))

	case "hit_page":
		a.DB.HitPage(ctx.Query("page"), ctx.Query("ip"), ctx.Query("browser"), ctx.Query("ua"), ctx.QueryBool("is_mobile"))

	case "seasons":
		query = a.DB.Seasons(ctx.QueryInt("series_id"))

	case "series":
		query = a.DB.Series(ctx.QueryInt("id"), ctx.QueryBool("active"))

	case "series_list":
		query = a.DB.SeriesList(ctx.QueryInt("id"), ctx.QueryBool("active"))

	case "series_popularity":
		query = a.DB.SeriesPopularity()

	case "series_sessions":
		query = a.DB.SeriesSessions(ctx.QueryInt("id"))

	case "sessions":
		query = a.DB.Sessions()

	case "session":
		query = a.DB.Subsessions(ctx.QueryInt("session_id"))

	case "subsession":
		query = a.DB.Subsession(ctx.QueryInt("id"))

	case "subsession_results":
		query = a.DB.SubsessionResults(ctx.QueryInt("id"))

	// List of series a track is used in
	case "track_season_uses":
		query = a.DB.TrackSeasonUsesList(ctx.QueryInt("id"))

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
