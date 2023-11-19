import {useParams} from "react-router-dom";
import {Paper, Skeleton} from "@mui/material";
import useFetch from "../../hooks/useFetch.ts";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {Series as SeriesModel, SeriesDefault} from "../../types/Types.ts";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Series() {

    const {id} = useParams()

    const [seriess, loading] = useFetch<SeriesModel>(`/api/series?id=${id}`)

    const [series, setSeries] = useState(SeriesDefault)

    useEffect(() => {
        if (seriess.length < 1) return
        setSeries(seriess[0])
        console.log(series)
    }, [seriess]);

    return <Container maxWidth="xl">

        <Grid container mt={2}>

            <Grid sm={12} md={12} lg>
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
                        />
                        <Typography variant="h4" fontWeight="bold" mt={2}>{series.name}</Typography>
                    </>
                )}
                <Typography variant="subtitle2">more to come soon</Typography>
            </Grid>

            <Grid sm={12} md={12} lg={5}>
                <Paper
                    sx={{
                        p: 2,
                        height: '40vh',
                        overflow: 'auto',
                        overflowX: 'hidden',
                        display: 'flex',
                    }}
                >
                    <Box m="auto">
                        <Typography variant="h6" fontWeight="bold" mb={1}>Details</Typography>

                        <Typography paragraph>
                            <div dangerouslySetInnerHTML={{__html: series.copy}}/>
                        </Typography>
                    </Box>
                </Paper>
            </Grid>

        </Grid>
    </Container>
}
