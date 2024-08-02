import './Races.css'
import {Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import SeriesLogo from "../../components/images/SeriesLogo.tsx";
import Container from "@mui/material/Container";
import StatsGrid from "../../components/data/grid/StatsGrid.tsx";
import Typography from "@mui/material/Typography";
import {UnixToTime} from "../../functions/datetime/UnixToDate.ts";
import useFetchArray from "../../hooks/useFetchArray.ts";
import {Session} from "../../models/Session.ts";
import {GridCol} from "../../components/data/grid/models/GridCol.ts";
import Box from "@mui/material/Box";

const columns: GridCol<any, any>[] = [
    {
        key: 'series_logo',
        name: 'Series',
        width: 75,
        renderCell: params =>
            <Link to={`/series/${params.row.series_id}`}>
                <SeriesLogo link={params.row.series_logo} />
            </Link>,
        sortable: false,
        filterable: false,
        // headerAlign: 'center',
    },
    {
        width: 50,
        key: 'category_id',
        name: 'License Category',
        hideName: true,
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: params =>
            CategoryLogo(params.row.category_id, params.row.min_license_level)

    },
    {
        key: 'series_short_name',
        name: 'Series Name',
        hideName: true,
        minWidth: 350,
        renderCell: params =>
            <Tooltip title="See splits" disableInteractive>
                <Link
                    style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                    to={`/sessions/${params.row.id}`}
                >
                        {params.row.series_short_name}
                </Link>
            </Tooltip>
    },
    {
        key: 'subsession_count',
        name: 'Splits',
        width: 70,
        align: 'center',
        type: 'number'
    },
    {
        key: 'start_time',
        name: 'Start Time',
        align: 'center',
        filterable: false,
        type: 'number',
        renderCell: params => UnixToTime(params.row.start_time)
    },
    {
        key: 'end_time',
        name: 'End Time',
        align: 'center',
        filterable: false,
        type: 'number',
        renderCell: params => UnixToTime(params.row.end_time)
    },
    {
        key: 'track',
        name: 'Track',
        // flex: 1,
        minWidth: 200
    },
];


export default function Races() {

    const [rows, loading] = useFetchArray<Session>('/api/sessions');

    return (
        <>
            <Typography variant="h5" fontWeight="bold" mt={1}>Races</Typography>
            <Typography variant="subtitle2" style={{color: 'darkgray'}}>Last 24 Hours</Typography>

            <Container maxWidth="xl">
                <Box>
                    <StatsGrid
                        id={'recent-races'}
                        loading={loading}
                        rows={rows.sort((a, b) => b.end_time - a.end_time)}
                        columns={columns}
                        rowName={'races'}
                    />
                </Box>
            </Container>
        </>
    )
}
