// import {Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CircularProgress, Paper} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../components/data/StatCard.tsx";
import {Series} from "../../../../models/Series.ts";
import {DefaultSeason, Season} from "../../../../models/Season.ts";
import {CarClassesById, CarsById} from "../../../../cache/CachesById.ts";
import {Car} from "../../../../models/Car.ts";
import CarImage from "../../../../components/images/CarImage.tsx";
import useWindowSize from "../../../../hooks/useWindowSize.ts";

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
                <CarList seasons={props.seasons} seasons_loading={props.seasons_loading}/>
            </Grid>

        </Grid>
    </>
}

type CarListProps = {
    seasons: Season[],
    seasons_loading: boolean,
}

function CarList(props: CarListProps) {

    const [_width, height] = useWindowSize()

    const latestSeason = props.seasons_loading ? DefaultSeason : props.seasons[0]
    console.log(latestSeason)

    if (latestSeason.car_classes === null) return <></>

    let cars: Car[] = []

    for (const car_class_id of latestSeason.car_classes) {
        const car_class = CarClassesById()[car_class_id]

        for (const car_id of car_class.cars_in_class) {
            cars.push(CarsById()[car_id])
        }
    }

    return <>
        <Paper
            elevation={3}
            sx={{
                maxHeight: height * 0.7,
                padding: 1,
                overflowY: 'auto',
                border: '2px solid maroon',
                borderRadius: '1em',
            }}
        >
            <Typography variant="h6" fontWeight="bold" lineHeight={1.2} fontFamily={'Verdana'}>Cars</Typography>

            <Grid container>
                <Grid md={ cars.length > 1 ? 0 : 3 }/>
                { props.seasons_loading ?
                    <CircularProgress/> :
                    cars.map((car) =>
                        <Grid md={ 6 }>
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
