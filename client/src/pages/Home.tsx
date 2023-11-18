import {useEffect, useState} from "react";
import {UnixToDate, UnixToDateTime} from "../functions/datetime/UnixToDate.ts";
import CurrentUrl from "../variables/Url.ts";
import Typography from "@mui/material/Typography";
import {CircularProgress, Paper} from "@mui/material";
import Odometer from 'react-odometerjs';
import '../style/Odometer.css'
import Sleep from "../functions/datetime/Sleep.ts";

export default function Home() {
    const [minTime, setMinTime] = useState(0)
    const [maxTime, setMaxTime] = useState(0)

    const [subsessionCount, setSubsessionCount] = useState(0)
    const [loadingCount, setLoadingCount] = useState(true)

    useEffect(() => {
        const url = `${CurrentUrl()}/api/data_range`
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, number>) => {
                setMinTime(data['min'])
                setMaxTime(data['max'])
            })
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`${CurrentUrl()}/api/count?table=subsessions`)
                .then(r => r.json())
                .then(data => {
                    setLoadingCount(false)
                    Sleep(0.1).then(() => setSubsessionCount(data[0]['count']))
                })
        }, 4000)

        return () => clearInterval(interval)
    });

    return (
        <>
            <Typography variant="h2" component="h1" mt={3}>iRacing Stats</Typography>
            <h3>Data Range</h3>
            <p>{UnixToDate(minTime)} - {UnixToDateTime(maxTime)}</p>

            <Paper elevation={5} style={{ width: '12em', padding: '0.25rem 2rem 1rem 2rem', margin: '2em auto' }}>
                <h3>Subsessions</h3>
                {/*<Odometer value={subsessionCount} duration={2000} format="(,ddd)"/>*/}
                { loadingCount ? (
                    <CircularProgress size={'1em'}/>
                ) : (
                    <Odometer value={subsessionCount} duration={2000} format="(,ddd)"/>
                )}
            </Paper>
        </>
    )
}
