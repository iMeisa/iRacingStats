import {useEffect, useState} from "react";
import {UnixToDate, UnixToDateTime} from "../functions/datetime/UnixToDate.ts";
import CurrentUrl from "../variables/Url.ts";
import Typography from "@mui/material/Typography";
import '../style/Odometer.css'
import SubsessionCounter from "../components/data/SubsessionCounter.tsx";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import PageCard from "../components/navigation/PageCard.tsx";
import {Divider} from "@mui/material";

export default function Home() {
    const [minTime, setMinTime] = useState(0)
    const [maxTime, setMaxTime] = useState(0)

    useEffect(() => {
        const url = `${CurrentUrl()}/api/data_range`
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, number>) => {
                setMinTime(data['min'])
                setMaxTime(data['max'])
            })
    }, []);

    return (
        <>
            <Typography variant="h3" fontWeight={600} mt={3}>iRStats</Typography>
            <Typography variant="subtitle1" mb={3}>Home of iRacing statistics</Typography>

            <Container>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={6} md={6}>
                        <PageCard
                            title="Races"
                            description="See races that just finished"
                            link="/races"
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                        <PageCard
                            title="Series"
                            description="See series participation and more"
                            link="/series"
                            wip
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <PageCard
                            title="Cars"
                            description="Find stats for your favorite cars"
                            link="/cars"
                            wip
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={4}>
                        <PageCard
                            title="Tracks"
                            description="Your favorite tracks also have stats"
                            link="/tracks"
                            wip
                        />
                    </Grid>
                    <Grid xs={12} sm={12} md={4}>
                        <PageCard
                            title="Users"
                            description="Statistics about you and your friends"
                            link="/users"
                        />
                    </Grid>
                </Grid>

                <Divider  sx={{ my: '2em', mx: '15px' }}/>
                <Typography variant="h5" >Data Range:</Typography>
                <p>{UnixToDate(minTime)} - {UnixToDateTime(maxTime)}</p>
                <SubsessionCounter/>

            </Container>
        </>
    )
}
