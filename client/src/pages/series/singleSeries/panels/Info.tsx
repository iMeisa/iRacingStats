// import {Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../components/data/StatCard.tsx";
import {Series} from "../../../../models/Series.ts";
import {Season} from "../../../../models/Season.ts";

type InfoProps = {
    loading: boolean,
    series: Series,
    seasons: Season[],
    seasons_loading: boolean,
    races: Record<string, unknown>[],
    races_loading: boolean,
}

export default function Info(props: InfoProps) {
    return <>
        {/*<Typography variant="subtitle2">more to come soon </Typography>*/}

        <Grid container width="100%" mx="auto" mt={2}>

            <Grid md={6}>
                <StatCard name={'Recent Race'} value={'hello'} elevation={3}/>
            </Grid>

            <Grid md={6}>
                <Paper
                    elevation={3}
                    sx={{
                        // display: 'flex',
                        // justifyContent: 'center',
                        padding: 1,
                        height: '10em'
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" lineHeight={1.2}>Cars</Typography>

                    <CarList seasons={props.seasons} seasons_loading={props.seasons_loading}/>
                </Paper>
            </Grid>

        </Grid>
    </>
}

type CarListProps = {
    seasons: Season[],
    seasons_loading: boolean,
}

function CarList(_props: CarListProps) {
    return <></>
}
