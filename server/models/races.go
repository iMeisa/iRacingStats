package models

type Session struct {
	SessionId       int    `json:"id"`
	SeriesLogo      string `json:"series_logo"`
	SeriesShortName string `json:"series_short_name"`
	SubsessionCount int    `json:"subsession_count"`
	EndTime         int    `json:"end_time"`
	Track           string `json:"track"`
}

type Subsession struct {
}
