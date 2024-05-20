import {DefaultSeason, Season} from "../../../../../models/Season.ts";
import useWindowSize from "../../../../../hooks/useWindowSize.ts";
import {Car} from "../../../../../models/Car.ts";
import {CarClassesById, CarsById} from "../../../../../cache/CachesById.ts";
import {CircularProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CarImage from "../../../../../components/images/CarImage.tsx";

type CarListProps = {
    seasons: Season[],
    seasons_loading: boolean,
}

export default function CarList(props: CarListProps) {

    const [_width, height] = useWindowSize()

    const latestSeason = props.seasons_loading ? DefaultSeason : props.seasons[0]

    if (latestSeason.car_classes === null) return <></>

    let cars: Car[] = []
    const singleCar = () => cars.length < 2

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

            {/*{singleCar() ? "single car" : "many cars"}*/}
            <Grid container>
                {/*Padding for single car*/}
                <Grid
                    sm={ singleCar() ? 2 : 0 }
                    xl={ singleCar() ? 3 : 0 }
                />

                { props.seasons_loading ?
                    <CircularProgress/> :

                    cars.map((car) =>
                        <Grid
                            key={car.car_id}
                            xs={12}
                            sm={ singleCar() ? 8 : 6}
                            md={ singleCar() ? 8 : 12 }
                            lg={ singleCar() ? 8 : 6 }
                            xl={6}
                        >
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
