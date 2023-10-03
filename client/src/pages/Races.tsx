// async function getSubsessions(): Promise<Array<Record<string, unknown>>> {
//     return (await fetch('http://127.0.0.1:8080/api/subsessions')).json()
// }

import {useEffect, useState} from "react";
// import {TableContainer, Table, TableHead, TableCell} from "@mui/material";
// import Paper from '@mui/material/Paper';

import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import './Races.css'


const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: '',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <img src={"https://images-static.iracing.com/img/logos/series/"+params.value}  alt="hello" width={60}/>,
        sortable: false,
    },
    // { field: 'id', headerName: 'ID', width: 100},
    { field: 'series_short_name', headerName: 'Series', width: 300 },
    { field: 'start_time', headerName: 'Start Time', width: 175},
    { field: 'track_name', headerName: 'Track', width: 300 },
    { field: 'track_config_name', headerName: 'Config', width: 300 },
];

export default function Races() {

    const emptyRows: Array<Record<string, unknown>> = []
    const [rows, setRows] = useState(emptyRows);

    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/subsessions_view")
            .then((response) => response.json())
            .then((data) => {

                // Data formatting here
                data.map(function (obj: Record<string, unknown>): Record<string, unknown> {
                    // Rename 'subsession_id' to 'id'
                    obj['id'] = obj['subsession_id']
                    delete obj['subsession_id']

                    // Format time to JS date
                    const start_date = new Date( Date.parse(obj['start_time'] as string) )
                    obj['start_time'] = start_date.toLocaleString()

                    return obj
                })

                setRows(data)
            })
    }, [])

    return (
        <>
            <h1>Races</h1>
            <div className={"data-grid"} style={{ height: 400, color: 'white' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </>
    )
}
