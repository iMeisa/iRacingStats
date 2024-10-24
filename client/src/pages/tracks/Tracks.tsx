import Container from "@mui/material/Container";
import TrackLogo from "../../components/images/TrackLogo.tsx";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../components/data/grid/models/GridCol.ts";
import ContentCache from "../../cache/ContentCache.ts";
import {Track} from "../../models/Track.ts";
import BoolIcon from "../../components/data/BoolIcon.tsx";
import Typography from "@mui/material/Typography";
import PageTitle from "../../functions/strings/PageTitle.ts";
import {Link} from "react-router-dom";


const columns: GridCol<any, any>[] = [
    {
        key: 'logo',
        name: '',
        width: 75,
        renderCell: params =>
            <Link to={`/track/${params.row.track_id}`}>
                <TrackLogo link={params.row.logo} />
            </Link>,
        sortable: false,
        filterable: false,
        align: 'right'
    },
    {
        width: 50,
        key: 'license_category_id',
        name: '',
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: params =>
            CategoryLogo(params.row.license_category_id, 0)
    },
    {
        key: 'track_name',
        name: 'Name',
        type: 'string',
        align: 'left',
        renderCell: params =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/track/${params.row.track_id}`}
            >
                {params.row.track_name}
            </Link>
    },
    {
        key: 'config_name',
        name: 'Config',
        type: 'string',
    },
    {
        key: 'ai_enabled',
        name: 'AI',
        type: 'boolean',
        renderCell: params => <BoolIcon value={params.row.ai_enabled} positiveValue={true}/>
    },
    {
        key: 'corners_per_lap',
        name: 'Corners',
        type: 'number',
    },
    {
        key: 'free_with_subscription',
        name: 'Free',
        type: 'boolean',
        renderCell: params => <BoolIcon value={params.row.free_with_subscription} positiveValue={true}/>
    },
    {
        key: 'retired',
        name: 'Retired',
        type: 'boolean',
        renderCell: params => <BoolIcon value={params.row.retired} positiveValue={false}/>
    },
    {
        key: 'track_config_length',
        name: 'Length',
        type: 'number',
        width: 150,
        renderCell: params =>
            `${(params.row.track_config_length * 1.609344).toFixed(2)} km (${params.row.track_config_length.toFixed(2)} mi)`,
    },
    {
        key: 'rain_enabled',
        name: 'Rain',
        type: 'boolean',
        renderCell: params => <BoolIcon value={params.row.rain_enabled} positiveValue={true}/>
    },
    {
        key: 'track_id',
        name: 'ID',
        type: 'number',
    }
];

export default function Tracks() {

    const tracks = ContentCache<Track>('tracks')
        .filter( track => track.track_id >= 0 )  // Filter out negative car ids
        .sort((a, b) => a.track_id - b.track_id )

    PageTitle('Tracks')

    return <>

        <Container maxWidth="xl">
            <Typography variant="h5" fontWeight="bold" mt={1}>Tracks</Typography>
            <StatsGrid
                id={'track-list'}
                rows={tracks}
                columns={columns}
                rowName={'tracks'}
            />
        </Container>
    </>
}
