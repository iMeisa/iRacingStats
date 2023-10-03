package db

import "math"

// rowCountParams defines params for LIMIT
var rowCountParams = intQuery{
	defaultValue: 10,
	maxValue:     50,
}

// offsetParams defines params for OFFSET
var offsetParams = intQuery{
	defaultValue: 0,
	maxValue:     math.MaxInt32,
}
