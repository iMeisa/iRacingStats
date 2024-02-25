import useFetchArray from "../../hooks/useFetchArray.ts";
import {DefaultDriverRace, DriverRace} from "../../models/driver/Race.ts";
import {useEffect, useState} from "react";
import FillDriverRaceData from "../../functions/driver/FillDriverRaceData.ts";

export default function FetchDriverRaces(id: any): [DriverRace[], boolean] {

    const [loading, setLoading] = useState(true)
    const [driverRaces, setDriverRaces] =
        useState<DriverRace[]>([DefaultDriverRace])

    let [fetched_races, races_loading] = useFetchArray<DriverRace>(`/api/driver_races?id=${id}`,
        (race) => {

            // race.car_id = 1

            race.valid_race = race.field_size >= 4 && race.event_laps_complete >= 2

            // race['id'] = race['result_id']
            race.dnf = race.reason_out_id !== 0 && race.reason_out_id !== undefined

            race.sr_change = (race.new_sub_level - race.old_sub_level) / 100
            race.ir_change = race.newi_rating - race.oldi_rating

            // let track = race['track_name']
            // const track_config = race['config_name']
            // if (track_config !== '') track += " - " + track_config
            // race['track'] = track

            return race
        }
    )

    useEffect(() => {

        if (races_loading) return

        setDriverRaces(FillDriverRaceData(fetched_races))
        setLoading(false)

    }, [races_loading]);

    return [driverRaces, loading]
}
