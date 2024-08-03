import useFetchArray from "../../hooks/useFetchArray.ts";
import {DefaultDriverRace, DriverRace} from "../../models/driver/Race.ts";
import {useEffect, useState} from "react";
import FillDriverRaceData from "../../functions/driver/FillDriverRaceData.ts";

export default function FetchDriverRaces(id: any): [DriverRace[], boolean] {

    const [loading, setLoading] = useState(true)
    const [driverRaces, setDriverRaces] =
        useState<DriverRace[]>([DefaultDriverRace])

    let [fetched_races, races_loading] =
        useFetchArray<DriverRace>(`/api/driver_races?id=${id}`)

    useEffect(() => {

        if (races_loading) return

        setDriverRaces(FillDriverRaceData(fetched_races))
        setLoading(false)

    }, [races_loading]);

    return [driverRaces, loading]
}
