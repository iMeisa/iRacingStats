import {useEffect, useState} from "react";

import {DataGrid, GridColDef, GridRenderCellParams,} from '@mui/x-data-grid';
import './Races.css'


const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: '',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <img src={"https://images-static.iracing.com/img/logos/series/"+params.value}  alt="logo" width={60}/>,
        sortable: false,
    },
    // { field: 'id', headerName: 'ID', width: 100},
    {
        field: 'series_short_name',
        headerName: 'Series',
        width: 500,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <a style={{color: 'white'}} href={`/sessions/${params.row.id}`}>{params.value}</a>
    },
    { field: 'subsession_count', headerName: 'Subsessions', width: 100, align: 'center' },
    { field: 'start_time', headerName: 'Start Time', width: 200 },
    { field: 'track_name', headerName: 'Track', width: 300 },
    { field: 'config_name', headerName: 'Config', width: 150 },
];

export default function Races() {

    const emptyRows: Array<Record<string, unknown>>[] = []
    const [rows, setRows] = useState(emptyRows);

    // Fetch sessions
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/sessions?rows=100`)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)

                // Data formatting here
                data.map(function (obj: Record<string, unknown>): Record<string, unknown> {
                    // Rename 'session_id' to 'id'
                    obj['id'] = obj['session_id']
                    delete obj['session_id']

                    // Format time to JS date
                    const start_date = new Date( Date.parse(obj['start_time'] as string) )
                    obj['start_time'] = start_date.toLocaleString()

                    // Subsession count
                    obj['subsession_count'] = (obj['associated_subsession_ids'] as number[]).length

                    return obj
                })

                setRows(rows.concat(data))
            })
    }, [])

    return (
        <>
            <h1>💀Races💀</h1>
            {/*<h1>💀</h1>*/}
            {/*<h1 className={"fuelvine-ad"}>DOWNLOAD FUELVINE NOW!!!!!!!!!!!!!!!!!!!!!!</h1>*/}
            <div className={"data-grid"}>
                <DataGrid
                    sx={{color: 'white'}}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25]}
                />
            </div>
        </>
    )
}
