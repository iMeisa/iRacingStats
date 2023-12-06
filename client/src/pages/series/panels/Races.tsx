import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import {Tooltip} from "@mui/material";
import {UnixToDateTime} from "../../../functions/datetime/UnixToDate.ts";

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
        headerAlign: 'center',
    },
    {
        field: 'series_short_name',
        headerName: '',
        headerAlign: 'center',
        minWidth: 350,
        flex: 1,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Tooltip title="Subsession Results">
                <Link
                    style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                    to={`/subsession/${params.row.subsession_id}`}
                >
                    {params.value}
                </Link>
            </Tooltip>
    },
    {
        field: 'end_time',
        headerName: 'End Time',
        width: 175,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => UnixToDateTime(params.value)
    },
    {
        field: 'track',
        headerName: 'Track',
        flex: 1,
        minWidth: 300,
    }
];

export default function Races(props: {results: Record<string, unknown>[], loading: boolean}) {
    return <DataGrid
        sx={{
            maxHeight: '75vh',
        }}
        // autoHeight
        columns={columns}
        rows={props.results}
        disableColumnMenu
        pageSizeOptions={[]}
    />
}
