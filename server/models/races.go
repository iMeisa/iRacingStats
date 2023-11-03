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
	AverageLap      int    `json:"average_lap"`
	Cautions        int    `json:"cautions"`
	CautionType     int    `json:"caution_type"`
	FieldSize       int    `json:"field_size"`
	HasCautions     bool   `json:"has_cautions"`
	Id              int    `json:"id"`
	LeadChanges     int    `json:"lead_changes"`
	SeriesLogo      string `json:"series_logo"`
	SeriesName      string `json:"series_name"`
	StrengthOfField int    `json:"strength_of_field"`
}
