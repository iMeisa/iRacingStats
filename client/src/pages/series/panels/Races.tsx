import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {UnixToDateTime, UnixToTime} from "../../../functions/datetime/UnixToDate.ts";
import Button from "@mui/material/Button";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TimeAgo from "react-timeago";

const columns: GridColDef[] = [
    {
        field: 'time_ago',
        headerName: '',
        width: 175,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => <TimeAgo date={UnixToDateTime(params.row.end_time)}/>
    },
    {
        field: 'id',
        headerName: '',
        headerAlign: 'center',
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Tooltip title="Subsession Results">
                <Link
                    to={`/sessions/${params.value}`}
                >
                    <Button variant="contained" size="small" startIcon={<FormatListNumberedIcon/>} >
                        Splits
                    </Button>
                </Link>
            </Tooltip>
    },
    {
        field: 'subsession_count',
        headerName: 'Splits',
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'start_time',
        headerName: 'Start Time',
        width: 175,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => UnixToDateTime(params.value)
    },
    {
        field: 'end_time',
        headerName: 'End Time',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => UnixToTime(params.value)
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
            minHeight: '100px',
        }}
        // autoHeight
        columns={columns}
        rows={props.results}
        disableColumnMenu
        pageSizeOptions={[]}
    />
}
