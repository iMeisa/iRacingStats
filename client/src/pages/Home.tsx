import {useEffect, useState} from "react";
import {UnixToDate, UnixToDateTime} from "../functions/date/UnixToDate.ts";
import CurrentUrl from "../variables/Url.ts";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";
import {CircularProgress, Paper} from "@mui/material";

export default function Home() {
    const [minTime, setMinTime] = useState(0)
    const [maxTime, setMaxTime] = useState(0)

    const [subsessionCount, setSubsessionCount] = useState(0)
    const [prevCount, setPrevCount] = useState(0)

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
                    setPrevCount(subsessionCount)
                    setSubsessionCount(data[0]['count'])
                })
        }, 4000)

        return () => clearInterval(interval)
    });

    return (
        <>
            <Typography variant="h2" component="h1" mt={3}>iRacing Stats</Typography>
            <h3>Data Range</h3>
            <p>{UnixToDate(minTime)} - {UnixToDateTime(maxTime)}</p>

            <Paper elevation={5} style={{ width: '12em', padding: '0.25em 2em 1em 2em', margin: '2em auto' }}>
                <h3>Subsessions</h3>
                { subsessionCount < 1 ? (
                    <CircularProgress size={'1em'}/>
                ) : (
                    <CountUp start={prevCount} end={subsessionCount} redraw={true} duration={5}/>
                )}
            </Paper>
        </>
    )
}
