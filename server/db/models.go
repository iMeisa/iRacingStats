package db

// JsonMap holds JSON result from query
type JsonMap map[string]interface{}

// UrlQueryMap holds query arguments given in a URL
type UrlQueryMap map[string]string

// intQuery is used to define a default and max value for query of int type
type intQuery struct {
	defaultValue int
	maxValue     int
}
