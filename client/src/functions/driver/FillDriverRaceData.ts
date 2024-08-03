import {DefaultDriverRace, DriverRace} from "../../models/driver/Race.ts";
import {CarsById, SeriesById, TracksById} from "../../cache/CachesById.ts";

function fillDefaults(races: DriverRace[]): DriverRace[] {
    const ddr = DefaultDriverRace

    races.map(race => {

        race.average_lap = replace(race.average_lap, ddr.average_lap)
        race.laps_complete = replace(race.laps_complete, ddr.laps_complete)
        race.laps_lead = replace(race.laps_lead, ddr.laps_lead)
        race.finish_position_in_class = replace(race.finish_position_in_class, ddr.finish_position_in_class)
        race.starting_position_in_class = replace(race.starting_position_in_class, ddr.starting_position_in_class)
        race.incidents = replace(race.incidents, ddr.incidents)
        race.reason_out_id = replace(race.reason_out_id, ddr.reason_out_id)

    })

    return races
}

export default function FillDriverRaceData(races: DriverRace[]): DriverRace[] {

    const cars = CarsById()
    const series = SeriesById()
    const tracks = TracksById()

    races = fillDefaults(races)

    races.map(race => {

        // Car data
        race.car_logo = cars[race.car_id].logo
        race.car_name = cars[race.car_id].car_name

        // Series data
        race.series_logo = series[race.series_id].series_logo
        race.series_short_name = series[race.series_id].series_short_name
        race.min_license_level = series[race.series_id].min_license_level

        // Track data
        race.track_logo = tracks[race.track_id].logo
        race.track_config_length = tracks[race.track_id].track_config_length

        let track = tracks[race.track_id].track_name
        const track_config = tracks[race.track_id].config_name
        if (track_config !== '') track += " - " + track_config
        race.track = track

        // Other stats
        race.valid_race = race.field_size >= 4 && race.laps_complete >= 2

        race.adjusted_position = race.finish_position_in_class + 1
        race.pos_delta = race.starting_position_in_class - race.finish_position_in_class

        race.dnf = race.reason_out_id !== 0 && race.reason_out_id !== undefined

        race.sr_change = (race.new_sub_level - race.old_sub_level) / 100
        race.ir_change = race.newi_rating - race.oldi_rating
    })

    races.sort((a, b) => b.end_time - a.end_time)

    return races
}

function replace(val: any, defaultVal: any): any {
    return val === undefined ? defaultVal : val
}
