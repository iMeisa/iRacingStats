import Typography from "@mui/material/Typography";
import {CircularProgress, Paper, Stack} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Series} from "../../../../models/Series.ts";
import {DefaultSeason, Season} from "../../../../models/Season.ts";
import {CarClassesById, CarsById} from "../../../../cache/CachesById.ts";
import {Car} from "../../../../models/Car.ts";
import CarImage from "../../../../components/images/CarImage.tsx";
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {DefaultSession, Session} from "../../../../models/Session.ts";
import Box from "@mui/material/Box";
import TimeAgo from "@elbotho/timeago-react";
import {UnixToDateTime} from "../../../../functions/datetime/UnixToDate.ts";
import CategoryLogo from "../../../../functions/img/CategoryLogo.tsx";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

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
        {/*<Typography variant="subtitle2">more to come soon </Typography>*/}

        <Grid container width="100%" mx="auto" mt={2}>

            <Grid xs={12} md={6}>
                <RecentRace races={props.races} races_loading={props.races_loading}/>
                {/*<StatCard name={'Recent Race'} value={'hello'} elevation={3}/>*/}
            </Grid>

            <Grid mt={{ xs: 2, md: 0 }} xs={12} md={6}>
                <CarList seasons={props.seasons} seasons_loading={props.seasons_loading}/>
            </Grid>

        </Grid>
    </>
}

type RecentRaceProps = {
    races: Session[],
    races_loading: boolean,
}

function RecentRace(props: RecentRaceProps) {

    props.races.sort((a, b) => b.session_id - a.session_id)
    const latestRace = props.races_loading ? DefaultSession : props.races[0]

    return <>
        <Paper
            elevation={3}
            sx={{
                marginX: 1,
                padding: 1,

                border: '2px solid turquoise',
                borderRadius: '1em',
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                lineHeight={1.2}
                fontFamily={'Verdana'}
            >
                Most Recent Race
            </Typography>

            <Paper
                elevation={5}
                sx={{
                    marginTop: 1,
                    padding: 1,
                }}
            >

                <Box display='flex' justifyContent='space-between' alignItems='center'>

                    {CategoryLogo(latestRace.category_id, latestRace.min_license_level, 50)}

                    <Stack>
                        <Box mx='auto' display='flex' justifyContent='space-around' alignItems='center' width='80%'>
                            <TimeAgo datetime={UnixToDateTime(latestRace.end_time)}/>
                            <Typography>Splits: {latestRace.subsession_count}</Typography>
                        </Box>

                        <Box display='flex' mx={1}>
                            <Typography fontWeight='bold'>{latestRace.track}</Typography>
                        </Box>
                    </Stack>

                    <Link to={`/sessions/${latestRace.session_id}`}>
                        <Button variant="contained" size="small" startIcon={<FormatListNumberedIcon/>}>Results</Button>
                    </Link>
                </Box>

            </Paper>

        </Paper>
    </>
}

type CarListProps = {
    seasons: Season[],
    seasons_loading: boolean,
}

function CarList(props: CarListProps) {

    const [_width, height] = useWindowSize()

    const latestSeason = props.seasons_loading ? DefaultSeason : props.seasons[0]
    // console.log(latestSeason)

    if (latestSeason.car_classes === null) return <></>

    let cars: Car[] = []

    // Get a list of cars
    for (const car_class_id of latestSeason.car_classes) {
        const car_class = CarClassesById()[car_class_id]

        for (const car_id of car_class.cars_in_class) {
            cars.push(CarsById()[car_id])
        }
    }

    return <>
        <Paper
            elevation={1}
            sx={{
                maxHeight: height * 0.7,
                padding: 1,
                marginX: 1,

                overflowY: 'auto',

                border: '2px solid maroon',
                borderRadius: '1em',
            }}
        >
            <Typography variant="h6" fontWeight="bold" lineHeight={1.2} fontFamily={'Verdana'}>Cars</Typography>

            <Grid container>
                <Grid sm={ cars.length > 1 ? 0 : 3 }/>

                { props.seasons_loading ?
                    <CircularProgress/> :

                    cars.map((car) =>
                        <Grid key={car.car_id} sm={6}>
                            <CarImage
                                car={car}
                            />
                        </Grid>
                    )
                }

            </Grid>
        </Paper>
    </>
}
