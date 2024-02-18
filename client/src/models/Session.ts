export type Session = {
    id: number,
    session_id: number,
    season_id: number,
    series_id: number,
    series_logo: string,
    series_short_name: string,
    subsession_count: number,
    start_time: number,
    end_time: number,
    track: string,
    category_id: number,
    min_license_level: number,
}

export const DefaultSession = {
    id: 0,
    session_id: 0,
    season_id: 0,
    series_id: 0,
    series_logo: '',
    series_short_name: '',
    subsession_count: 0,
    start_time: 0,
    end_time: 0,
    track: '',
    category_id: 0,
    min_license_level: 0,
}
