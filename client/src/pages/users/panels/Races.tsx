import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import {Tooltip} from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { amber, grey, deepOrange } from '@mui/material/colors'
import {UnixToDateTime} from "../../../functions/datetime/UnixToDate.ts";

const columns: GridColDef[] = [
    {
        field: 'finish_position_in_class',
        headerName: 'Pos',
        width: 50,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => {
            switch (params.value) {
                case 0: {
                    return <EmojiEventsIcon sx={{ color: amber[500] }}/>
                }
                case 1: {
                    return <EmojiEventsIcon sx={{ color: grey[500] }}/>
                }
                case 2: {
                    return <EmojiEventsIcon sx={{ color: deepOrange[900] }}/>
                }
                default: {
                    return params.value + 1
                }
            }
        }
    },
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
        width: 50,
        field: 'license_category_id',
        headerName: '',
        sortable: false,
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
                    to={`/subsession/${params.row.subsession_id}`}
                >
                    {params.value}
                </Link>
            </Tooltip>
    },
    {
        field: 'event_strength_of_field',
        headerName: 'SOF',
        width: 75,
        headerAlign: 'center',
        align: 'center'
    },
    {
        field: 'end_time',
        headerName: 'End Time',
        width: 175,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => UnixToDateTime(params.value)
    },
    // { field: 'track', headerName: 'Track', flex: 1, minWidth: 200 },
    { field: 'incidents', headerName: 'Incidents', flex: 1, minWidth: 50 },
    {
        field: 'dnf',
        headerName: 'DNF',
        flex: 1,
        minWidth: 50,
        type: "boolean",
    },
];

export default function Races(props: {results: Record<string, unknown>[], loading: boolean}) {
    return <DataGrid
        columns={columns}
        rows={props.results}

        pageSizeOptions={[]}
    />
}
