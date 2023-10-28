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
	Id              int    `json:"id"`
	StrengthOfField int    `json:"strength_of_field"`
	FieldSize       int    `json:"field_size"`
	AverageLap      int    `json:"average_lap"`
	LeadChanges     int    `json:"lead_changes"`
	Cautions        int    `json:"cautions"`
	SeriesLogo      string `json:"series_logo"`
	SeriesName      string `json:"series_name"`
}
