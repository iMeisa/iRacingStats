package models

import "time"

type License struct {
	Level    int `json:"level"`
	SubLevel int `json:"sub_level"`
	IRating  int `json:"irating"`
}

type UserLicenses struct {
	Oval     License `json:"oval"`
	Road     License `json:"road"`
	DirtOval License `json:"dirt_oval"`
	DirtRoad License `json:"dirt_road"`
}

type Result struct {
	CustId                  int       `json:"cust_id"`
	TeamId                  int       `json:"team_id"`
	DisplayName             string    `json:"display_name"`
	TeamDisplayName         string    `json:"team_display_name"`
	FinishPosition          int       `json:"finish_position"`
	FinishPositionInClass   int       `json:"finish_position_in_class"`
	LapsLead                int       `json:"laps_lead"`
	LapsComplete            int       `json:"laps_complete"`
	OptLapsComplete         int       `json:"opt_laps_complete"`
	Interval                int       `json:"interval"`
	ClassInterval           int       `json:"class_interval"`
	AverageLap              int       `json:"average_lap"`
	BestLapNum              int       `json:"best_lap_num"`
	BestLapTime             int       `json:"best_lap_time"`
	BestNlapsNum            int       `json:"best_nlaps_num"`
	BestNlapsTime           int       `json:"best_nlaps_time"`
	BestQualLapAt           time.Time `json:"best_qual_lap_at"`
	BestQualLapNum          int       `json:"best_qual_lap_num"`
	BestQualLapTime         int       `json:"best_qual_lap_time"`
	ReasonOutId             int       `json:"reason_out_id"`
	ReasonOut               string    `json:"reason_out"`
	ChampPoints             int       `json:"champ_points"`
	DropRace                bool      `json:"drop_race"`
	ClubPoints              int       `json:"club_points"`
	Position                int       `json:"position"`
	QualLapTime             int       `json:"qual_lap_time"`
	StartingPosition        int       `json:"starting_position"`
	StartingPositionInClass int       `json:"starting_position_in_class"`
	CarClassId              int       `json:"car_class_id"`
	ClubId                  int       `json:"club_id"`
	ClubName                string    `json:"club_name"`
	ClubShortName           string    `json:"club_short_name"`
	Division                int       `json:"division"`
	OldLicenseLevel         int       `json:"old_license_level"`
	OldSubLevel             int       `json:"old_sub_level"`
	OldCpi                  float32   `json:"old_cpi"`
	OldiRating              int       `json:"oldi_rating"`
	OldTtrating             int       `json:"old_ttrating"`
	NewLicenseLevel         int       `json:"new_license_level"`
	NewSubLevel             int       `json:"new_sub_level"`
	NewCpi                  float32   `json:"new_cpi"`
	NewiRating              int       `json:"newi_rating"`
	NewTtrating             int       `json:"new_ttrating"`
	Multiplier              int       `json:"multiplier"`
	LicenseChangeOval       int       `json:"license_change_oval"`
	LicenseChangeRoad       int       `json:"license_change_road"`
	Incidents               int       `json:"incidents"`
	MaxPctFuelFill          int       `json:"max_pct_fuel_fill"`
	WeightPenaltyKg         int       `json:"weight_penalty_kg"`
	LeaguePoints            int       `json:"league_points"`
	LeagueAggPoints         int       `json:"league_agg_points"`
	CarId                   int       `json:"car_id"`
	AggregateChampPoints    int       `json:"aggregate_champ_points"`
	Ai                      bool      `json:"ai"`
}

type Series struct {
	Id              int     `json:"id"`
	Name            string  `json:"name"`
	Logo            string  `json:"logo"`
	CategoryId      int     `json:"category_id"`
	Category        string  `json:"category"`
	Active          bool    `json:"active"`
	Official        bool    `json:"official"`
	FixedSetup      bool    `json:"fixed_setup"`
	MinLicenseLevel int     `json:"min_license_level"`
	ForumUrl        string  `json:"forum_url"`
	MinStarters     int     `json:"min_starters"`
	MaxStarters     int     `json:"max_starters"`
	LargeImage      string  `json:"large_image"`
	SeriesCopy      string  `json:"copy"`
	SmallImage      string  `json:"small_image"`
	SrChange        float32 `json:"sr_change"`
}

type Session struct {
	SessionId       int    `json:"id"`
	SeriesLogo      string `json:"series_logo"`
	SeriesShortName string `json:"series_short_name"`
	SubsessionCount int    `json:"subsession_count"`
	EndTime         int    `json:"end_time"`
	Track           string `json:"track"`
	CategoryId      int    `json:"category_id"`
	MinLicenseLevel int    `json:"min_license_level"`
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
	Verified        bool   `json:"verified"`
}

type User struct {
	Id          int          `json:"id"`
	Name        string       `json:"name"`
	MemberSince int          `json:"member_since"`
	ClubId      int          `json:"club_id"`
	ClubName    string       `json:"club_name"`
	Licenses    UserLicenses `json:"licenses"`
}
