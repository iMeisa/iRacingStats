import {GridColDef, GridRenderCellParams,} from '@mui/x-data-grid';
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
import ContentCache from "../../hooks/ContentCache.ts";

const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Link to={`/series/${params.row.series_id}`}>
                <SeriesLogo link={params.value} />
            </Link>,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
    },
    {
        width: 50,
        field: 'category_id',
        headerName: '',
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: params =>
            CategoryLogo(params.value, params.row.min_license_level)

    },
    {
        field: 'series_short_name',
        headerName: '',
        headerAlign: 'center',
        minWidth: 350,
        flex: 1,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Tooltip title="See splits">
                <Link
                    style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                    to={`/sessions/${params.row.id}`}
                >
                        {params.value}
                </Link>
            </Tooltip>
    },
    {
        field: 'subsession_count',
        headerName: 'Splits',
        width: 70,
        align: 'center',
        headerAlign: 'center',
        type: 'number'
    },
    {
        field: 'start_time',
        headerName: 'Start Time',
        headerAlign: 'center',
        hideable: true,
        filterable: false,
        renderCell: params => UnixToTime(params.value)
    },
    {
        field: 'end_time',
        headerName: 'End Time',
        headerAlign: 'center',
        hideable: true,
        filterable: false,
        renderCell: params => UnixToTime(params.value)
    },
    { field: 'track', headerName: 'Track', flex: 1, minWidth: 200 },
];



export default function Races() {

    const [rows, loading] = useFetchArray<Session>('/api/sessions');
    const series = ContentCache('series')

    console.log(series)

    // Column defaults
    columns.map((col) => {
        col.hideSortIcons = true
    })

    return (
        <>
            <Typography variant="h5" fontWeight="bold" mt={1}>Races</Typography>
            <p style={{color: 'darkgray'}}>Last 24 Hours</p>

            <Container maxWidth="xl">
                <StatsGrid
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        sorting: {
                            sortModel: [{field: 'end_time', sort: 'desc'}],
                        },
                    }}
                />
            </Container>
        </>
    )
}

// function changeRows(model: GridPaginationModel, rowCount: number): boolean {
//     const totalPages = rowCount / model.pageSize
//     const pagesLeft = totalPages - model.page
//
//     console.log(pagesLeft)
//
//     return pagesLeft <= 1;
// }
