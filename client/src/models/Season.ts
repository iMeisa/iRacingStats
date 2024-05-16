export type Season = {
    season_id: number
    season_name: string
    season_short_name: string
    season_year: number
    season_quarter: number
    series_id: number
    license_group: number
    driver_changes: boolean
    car_classes: number[]
}

export const DefaultSeason: Season = {
    season_id: 0,
    season_name: '',
    season_short_name: '',
    season_year: 0,
    season_quarter: 0,
    series_id: 0,
    license_group: 0,
    driver_changes: false,
    car_classes: [1],
}
