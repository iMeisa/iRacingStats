import {DriverRace} from "../../models/driver/Race.ts";
import SortById from "../objects/SortById.ts";

export default function FillDriverRaceData(races: DriverRace[]): DriverRace[] {

    return filledRaces
}

function fillSeries(races: DriverRace[], seriesList: Record<string, unknown>[]): DriverRace[] {

    const series = SortById(seriesList, "series_id")

    races.map(race => {

        const id = race.series_id

        race.series_logo = series[id]['series_logo'] as string
    })

    return races
}
