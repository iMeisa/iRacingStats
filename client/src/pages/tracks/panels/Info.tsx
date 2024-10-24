import {Track} from "../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import GeneralTrackInfo from "./info/GeneralTrackInfo.tsx";
import OtherTrackInfo from "./info/OtherTrackInfo.tsx";

type TrackInfoProps = {
    track: Track
}

export default function TrackInfo(props: TrackInfoProps) {
    const [_width, height] = useWindowSize()

    return <>
        <Grid container width="100%" mx="auto" mt={2}>

            <Grid xs={12} md={6}>
                <Stack spacing={2}>
                    <Paper className={"stat-border info"} sx={{ p: 1 }}>

                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            General
                        </Typography>

                        <GeneralTrackInfo track={props.track}/>
                    </Paper>

                    <Paper className={"stat-border race-stats"} sx={{ p: 1 }}>

                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            Other
                        </Typography>

                        <OtherTrackInfo track={props.track}/>
                    </Paper>
                </Stack>
            </Grid>

            <Grid mt={{ xs: 2, md: 0 }} xs={12} md={6}>
                <Paper
                    className={'stat-border list-color'}
                    elevation={1}
                    sx={{
                        maxHeight: height * 0.7,
                        padding: 1,
                        marginX: 1,

                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" lineHeight={1.2} fontFamily={'Verdana'}>Series This Season</Typography>

                    {/*{singleCar() ? "single car" : "many cars"}*/}
                    <Grid container>
                        {/*Padding for single car*/}
                        <Grid
                            // sm={ singleCar() ? 2 : 0 }
                            // xl={ singleCar() ? 3 : 0 }
                        />

                        {/*{ props.seasons_loading ?*/}
                        {/*    <CircularProgress/> :*/}

                        {/*    cars.map((car) =>*/}
                        {/*        <Grid*/}
                        {/*            key={car.car_id}*/}
                        {/*            xs={12}*/}
                        {/*            sm={ singleCar() ? 8 : 6}*/}
                        {/*            md={ singleCar() ? 8 : 12 }*/}
                        {/*            lg={ singleCar() ? 8 : 6 }*/}
                        {/*            xl={6}*/}
                        {/*        >*/}
                        {/*            <CarImage*/}
                        {/*                car={car}*/}
                        {/*            />*/}
                        {/*        </Grid>*/}
                        {/*    )*/}
                        {/*}*/}

                    </Grid>
                </Paper>
            </Grid>

        </Grid>
    </>
}
