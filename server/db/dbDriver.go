package db

import (
	"database/sql"
	"fmt"
	"github.com/iMeisa/errortrace"
	_ "github.com/jackc/pgx/v4/stdlib"
	"log"
	"os"
	"time"
)

// DB holds the database connection pool
type DB struct {
	SQL *sql.DB
}

var dbConn = &DB{}

const maxOpenDbConn = 10
const maxIdleDbConn = 5
const connMaxLifetime = 5 * time.Minute

// ConnectSQL creates db pool for sqlite
func ConnectSQL(dbName string) (*DB, errortrace.ErrorTrace) {
	// New SQLite connection
	//db, err := NewDatabase("sqlite3", fmt.Sprintf("db/%v.db", dbName))

	// New postgres connection
	db, trace := NewDatabase("pgx", fmt.Sprintf("host=%v port=%v dbname=%v user=%v password=%v",
		os.Getenv("DBHOST"), os.Getenv("DBPORT"), dbName, os.Getenv("DBUSER"), os.Getenv("DBPASS")))

	if trace.HasError() {
		trace.Read()
		log.Fatal()
	}

	db.SetMaxOpenConns(maxOpenDbConn)
	db.SetMaxIdleConns(maxIdleDbConn)
	db.SetConnMaxLifetime(connMaxLifetime)
	db.SetConnMaxIdleTime(connMaxLifetime)

	dbConn.SQL = db

	return dbConn, errortrace.NilTrace()
}

// testDB tries to ping the database
func testDB(db *sql.DB) errortrace.ErrorTrace {
	log.Println("Pinging the DB...")
	if err := db.Ping(); err != nil {
		return errortrace.NewTrace(err)
	}
	return errortrace.NilTrace()
}

// NewDatabase creates a new database for the application
func NewDatabase(dbType, connArgs string) (*sql.DB, errortrace.ErrorTrace) {
	db, err := sql.Open(dbType, connArgs)
	if err != nil {
		return nil, errortrace.NewTrace(err)
	}

	if trace := testDB(db); trace.HasError() {
		return nil, trace
	}

	return db, errortrace.NilTrace()
}
