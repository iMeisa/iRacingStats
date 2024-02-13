package models

import "time"

type Car struct {
	CarId                   int                 `json:"car_id,omitempty"`
	CarName                 string              `json:"car_name,omitempty"`
	AiEnabled               bool                `json:"ai_enabled,omitempty"`
	AllowNumberColors       bool                `json:"allow_number_colors,omitempty"`
	AllowNumberFont         bool                `json:"allow_number_font,omitempty"`
	AllowSponsor1           bool                `json:"allow_sponsor_1,omitempty"`
	AllowSponsor2           bool                `json:"allow_sponsor_2,omitempty"`
	AllowWheelColor         bool                `json:"allow_wheel_color,omitempty"`
	AwardExempt             bool                `json:"award_exempt,omitempty"`
	CarDirpath              string              `json:"car_dirpath,omitempty"`
	CarNameAbbreviated      string              `json:"car_name_abbreviated,omitempty"`
	CarWeight               int                 `json:"car_weight,omitempty"`
	Categories              []string            `json:"categories,omitempty"`
	Created                 int                 `json:"created,omitempty"`
	FirstSale               int                 `json:"first_sale,omitempty"`
	ForumUrl                string              `json:"forum_url,omitempty"`
	FreeWithSubscription    bool                `json:"free_with_subscription,omitempty"`
	HasHeadlights           bool                `json:"has_headlights,omitempty"`
	HasMultipleDryTireTypes bool                `json:"has_multiple_dry_tire_types,omitempty"`
	Hp                      int                 `json:"hp,omitempty"`
	IsPsPurchasable         bool                `json:"is_ps_purchasable,omitempty"`
	MaxPowerAdjustPct       int                 `json:"max_power_adjust_pct,omitempty"`
	MaxWeightPenaltyKg      int                 `json:"max_weight_penalty_kg,omitempty"`
	MinPowerAdjustPct       int                 `json:"min_power_adjust_pct,omitempty"`
	PackageId               int                 `json:"package_id,omitempty"`
	Patterns                int                 `json:"patterns,omitempty"`
	Price                   float32             `json:"price,omitempty"`
	PriceDisplay            string              `json:"price_display,omitempty"`
	Retired                 bool                `json:"retired,omitempty"`
	SearchFilters           []string            `json:"search_filters,omitempty"`
	Sku                     int                 `json:"sku,omitempty"`
	CarRules                []map[string]string `json:"car_rules,omitempty"`
	DetailCopy              string              `json:"detail_copy,omitempty"`
	DetailScreenShotImages  []string            `json:"detail_screen_shot_images,omitempty"`
	DetailTechspecsCopy     string              `json:"detail_techspecs_copy,omitempty"`
	Folder                  string              `json:"folder,omitempty"`
	GalleryPrefix           string              `json:"gallery_prefix,omitempty"`
	GroupImage              string              `json:"group_image,omitempty"`
	GroupName               string              `json:"group_name,omitempty"`
	LargeImage              string              `json:"large_image,omitempty"`
	Logo                    string              `json:"logo,omitempty"`
	SmallImage              string              `json:"small_image,omitempty"`
	SponsorLogo             string              `json:"sponsor_logo,omitempty"`
	TemplatePath            string              `json:"template_path,omitempty"`
	GalleryImages           string              `json:"gallery_images,omitempty"`
}

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
	ResultId                int       `json:"id"`
	SubsessionId            int       `json:"subsession_id"`
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
	SessionCount    int     `json:"session_count"`
	SubsessionCount int     `json:"subsession_count"`
	TotalEntryCount int     `json:"total_entry_count"`
	Track           string  `json:"track"`
}

type Session struct {
	SessionId       int    `json:"id"`
	SeriesId        int    `json:"series_id"`
	SeriesLogo      string `json:"series_logo"`
	SeriesShortName string `json:"series_short_name"`
	SubsessionCount int    `json:"subsession_count"`
	StartTime       int    `json:"start_time"`
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
	SeriesId        int    `json:"series_id"`
}

type Track struct {
	TrackId                int               `json:"track_id,omitempty"`
	TrackName              string            `json:"track_name,omitempty"`
	ConfigName             string            `json:"config_name,omitempty"`
	LicenseCategoryId      int               `json:"license_category_id,omitempty"`
	AiEnabled              bool              `json:"ai_enabled,omitempty"`
	AllowPitlaneCollisions bool              `json:"allow_pitlane_collisions,omitempty"`
	AllowRollingStart      bool              `json:"allow_rolling_start,omitempty"`
	AllowStandingStart     bool              `json:"allow_standing_start,omitempty"`
	AwardExempt            bool              `json:"award_exempt,omitempty"`
	Closes                 int               `json:"closes,omitempty"`
	CornersPerLap          int               `json:"corners_per_lap,omitempty"`
	Created                int               `json:"created,omitempty"`
	FirstSale              int               `json:"first_sale,omitempty"`
	FreeWithSubscription   bool              `json:"free_with_subscription,omitempty"`
	FullyLit               bool              `json:"fully_lit,omitempty"`
	GridStalls             int               `json:"grid_stalls,omitempty"`
	HasOptPath             bool              `json:"has_opt_path,omitempty"`
	HasShortParadeLap      bool              `json:"has_short_parade_lap,omitempty"`
	HasStartZone           bool              `json:"has_start_zone,omitempty"`
	HasSvgMap              bool              `json:"has_svg_map,omitempty"`
	IsDirt                 bool              `json:"is_dirt,omitempty"`
	IsOval                 bool              `json:"is_oval,omitempty"`
	IsPsPurchasable        bool              `json:"is_ps_purchasable,omitempty"`
	LapScoring             int               `json:"lap_scoring,omitempty"`
	Latitude               float32           `json:"latitude,omitempty"`
	Longitude              float32           `json:"longitude,omitempty"`
	Location               string            `json:"location,omitempty"`
	MaxCars                int               `json:"max_cars,omitempty"`
	NightLighting          bool              `json:"night_lighting,omitempty"`
	NominalLapTime         float32           `json:"nominal_lap_time,omitempty"`
	NumberPitStalls        int               `json:"number_pit_stalls,omitempty"`
	Opens                  int               `json:"opens,omitempty"`
	PackageId              int               `json:"package_id,omitempty"`
	PitRoadSpeedLimit      int               `json:"pit_road_speed_limit,omitempty"`
	Price                  float32           `json:"price,omitempty"`
	PriceDisplay           string            `json:"price_display,omitempty"`
	Priority               int               `json:"priority,omitempty"`
	Purchasable            bool              `json:"purchasable,omitempty"`
	QualifyLaps            int               `json:"qualify_laps,omitempty"`
	RestartOnLeft          bool              `json:"restart_on_left,omitempty"`
	Retired                bool              `json:"retired,omitempty"`
	SearchFilters          string            `json:"search_filters,omitempty"`
	SiteUrl                string            `json:"site_url,omitempty"`
	Sku                    int               `json:"sku,omitempty"`
	SoloLaps               int               `json:"solo_laps,omitempty"`
	StartOnLeft            bool              `json:"start_on_left,omitempty"`
	SupportsGripCompound   bool              `json:"supports_grip_compound,omitempty"`
	TechTrack              bool              `json:"tech_track,omitempty"`
	TimeZone               string            `json:"time_zone,omitempty"`
	TrackConfigLength      float32           `json:"track_config_length,omitempty"`
	TrackDirpath           string            `json:"track_dirpath,omitempty"`
	Banking                string            `json:"banking,omitempty"`
	Coordinates            string            `json:"coordinates,omitempty"`
	DetailCopy             string            `json:"detail_copy,omitempty"`
	DetailTechspecsCopy    string            `json:"detail_techspecs_copy,omitempty"`
	DetailVideo            string            `json:"detail_video,omitempty"`
	Folder                 string            `json:"folder,omitempty"`
	GalleryImages          string            `json:"gallery_images,omitempty"`
	LargeImage             string            `json:"large_image,omitempty"`
	Logo                   string            `json:"logo,omitempty"`
	North                  string            `json:"north,omitempty"`
	NumSvgImages           int               `json:"num_svg_images,omitempty"`
	SmallImage             string            `json:"small_image,omitempty"`
	TrackMap               string            `json:"track_map,omitempty"`
	TrackMapLayers         map[string]string `json:"track_map_layers,omitempty"`
	GalleryPrefix          string            `json:"gallery_prefix,omitempty"`
}

type User struct {
	Id          int          `json:"id"`
	Name        string       `json:"name"`
	MemberSince int          `json:"member_since"`
	ClubId      int          `json:"club_id"`
	ClubName    string       `json:"club_name"`
	Licenses    UserLicenses `json:"licenses"`
}

type DriverData struct {
	Cars    []Car    `json:"cars"`
	Results []Result `json:"results"`
	Series  []Series `json:"series"`
	Tracks  []Track  `json:"tracks"`
}
