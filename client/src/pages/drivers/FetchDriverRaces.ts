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

            race.valid_race = race.field_size >= 4 && race.laps_complete >= 2

            race.dnf = race.reason_out_id !== 0 && race.reason_out_id !== undefined

            race.sr_change = (race.new_sub_level - race.old_sub_level) / 100
            race.ir_change = race.newi_rating - race.oldi_rating

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
