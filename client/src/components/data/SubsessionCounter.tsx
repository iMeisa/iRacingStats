import {useEffect, useState} from "react";
import CurrentUrl from "../../variables/Url.ts";
import Sleep from "../../functions/datetime/Sleep.ts";
import {CircularProgress, Paper} from "@mui/material";
import Odometer from "react-odometerjs";

export default function SubsessionCounter() {

    const [subsessionCount, setSubsessionCount] = useState(0)
    const [loadingCount, setLoadingCount] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`${CurrentUrl()}/api/count?table=subsessions`)
                .then(r => r.json())
                .then(data => {
                    setLoadingCount(false)
                    Sleep(0.01).then(() => setSubsessionCount(data[0]['count']))
                })
        }, 4000)

        return () => clearInterval(interval)
    });

    return <Paper elevation={5} style={{ width: '12em', padding: '0.25rem 2rem 1rem 2rem', margin: '2em auto' }}>
        <h3>Subsessions</h3>
        { loadingCount ? (
            <CircularProgress size={'1em'}/>
        ) : (
            <Odometer value={subsessionCount} duration={5000} format="(,ddd)"/>
        )}
    </Paper>
}
