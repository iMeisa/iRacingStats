import Container from "@mui/material/Container";
import StatsGrid from "../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../components/data/grid/models/GridCol.ts";
import ContentCache from "../../cache/ContentCache.ts";
import {Car} from "../../models/Car.ts";
import CarLogo from "../../components/images/CarLogo.tsx";
import BoolIcon from "../../components/data/BoolIcon.tsx";
import Typography from "@mui/material/Typography";
import PageTitle from "../../functions/strings/PageTitle.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'logo',
        name: 'Car',
        width: 75,
        renderCell: params =>
            <CarLogo link={params.row.logo} />,
        sortable: false,
        filterable: false,
    },
    {
        key: 'car_name',
        name: 'Car Name',
        hideName: true,
        minWidth: 250,
        resizable: true,
        align: 'left',
        renderCell: params =>
            <Typography
                style={{
                    color: 'inherit',
                    fontWeight: 'bold'
                }}
            >
                {params.row.car_name}
            </Typography>
    },
    {
        key: 'ai_enabled',
        name: 'AI',
        type: "boolean",
        renderCell: params => <BoolIcon value={params.row.ai_enabled} positiveValue={true}/>
    },
    {
        key: 'car_weight',
        name: 'Weight',
        width: 150,
        type: 'number',
        renderCell: params =>
            `${Math.round(params.row.car_weight * 0.45359237)} kg (${params.row.car_weight} lb)`,
    },
    {
        key: 'free_with_subscription',
        name: 'Free',
        type: 'boolean',
        renderCell: params => <BoolIcon value={params.row.free_with_subscription} positiveValue={true}/>
    },
    {
        key: 'hp',
        name: 'HP',
        type: 'number',
    },
    {
        key: 'retired',
        name: 'Retired',
        type: 'boolean',
        renderCell: params => <BoolIcon value={params.row.retired} positiveValue={false}/>
    },
    {
        key: 'rain_enabled',
        name: 'Rain',
        type: 'boolean',
        renderCell: params => <BoolIcon value={params.row.rain_enabled} positiveValue={true}/>
    },
    {
        key: 'car_id',
        name: 'ID',
        type: 'number',
    }
]

export default function Cars() {

    const cars = ContentCache<Car>('cars')
        .filter( car => car.car_id >= 0 )  // Filter out negative car ids
        .sort((a, b) => a.car_id - b.car_id )

    PageTitle('Cars')

    return (
        <>

            <Container maxWidth="xl">
                <Typography variant="h5" fontWeight="bold" mt={1}>Cars</Typography>
                <StatsGrid
                    id={'cars'}
                    columns={columns}
                    rows={cars}
                    rowName={'cars'}
                />
            </Container>
        </>
    )
}
