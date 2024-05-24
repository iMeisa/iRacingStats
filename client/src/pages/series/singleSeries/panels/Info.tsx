import Grid from "@mui/material/Unstable_Grid2";
import {Series} from "../../../../models/Series.ts";
import {Season} from "../../../../models/Season.ts";
import {Session} from "../../../../models/Session.ts";
import CarList from "./info/CarList.tsx";
import RecentRace from "./info/RecentRace.tsx";
import Participation from "./info/Participation.tsx";
import {Stack} from "@mui/material";

type InfoProps = {
    loading: boolean,
    series: Series,
    seasons: Season[],
    seasons_loading: boolean,
    races: Session[],
    races_loading: boolean,
}

export default function Info(props: InfoProps) {
    return <>

        <Grid container width="100%" mx="auto" mt={2}>

            <Grid xs={12} md={6}>
                <Stack spacing={2}>
                    <RecentRace races={props.races} races_loading={props.races_loading}/>
                    <Participation/>
                </Stack>
            </Grid>

            <Grid mt={{ xs: 2, md: 0 }} xs={12} md={6}>
                <CarList seasons={props.seasons} seasons_loading={props.seasons_loading}/>
            </Grid>

        </Grid>
    </>
}
