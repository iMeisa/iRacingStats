import {useParams} from "react-router-dom";
import {Skeleton} from "@mui/material";
import useFetch from "../../hooks/useFetch.ts";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {Series as SeriesModel, SeriesDefault} from "../../types/Types.ts";

export default function Series() {

    const {id} = useParams()

    const [seriess, loading] = useFetch<SeriesModel>(`/api/series?id=${id}`)

    const [series, setSeries] = useState(SeriesDefault)

    useEffect(() => {
        if (seriess.length < 1) return
        setSeries(seriess[0])
        console.log(series)
    }, [seriess]);

    return <>

        { loading ? (
            <>
                <Skeleton className={"centered logo"} variant="rounded" width={200} height={100} />
                <Skeleton className={"centered"} variant="text" sx={{ fontSize: '1.5rem', width: '20vw' }}/>
            </>
        ) : (
            <>
                <img
                    className={"session-logo"}
                    src={"https://images-static.iracing.com/img/logos/series/"+series.logo}
                    alt="logo"
                    loading="lazy"
                    style={{ margin: '1em 0' }}
                />
                <Typography variant="h4" fontWeight="bold">{series.name}</Typography>
                <Typography variant="subtitle2">more to come soon</Typography>
            </>
        )}
    </>
}
