import {useEffect, useState} from "react";

import {DataGrid, GridColDef, GridPaginationModel, GridRenderCellParams,} from '@mui/x-data-grid';
import './Races.css'
import {LinearProgress} from "@mui/material";


const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <img src={"https://images-static.iracing.com/img/logos/series/"+params.value}  alt="logo" width={65}/>,
        sortable: false,
    },
    // { field: 'id', headerName: 'ID', width: 100},
    {
        field: 'series_short_name',
        headerName: '',
        headerAlign: 'center',
        width: 500,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <a style={{ textDecoration: 'underline', fontStyle: 'italic'}} href={`/sessions/${params.row.id}`}>{params.value}</a>
    },
    { field: 'subsession_count', headerName: 'Splits', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'end_time', headerName: 'End Time', width: 200 },
    { field: 'track', headerName: 'Track', flex: 1 },
];



export default function Races() {

    const emptyRows: Record<string, unknown>[] = []
    const [rows, setRows] = useState(emptyRows);

    const [loading, setLoading] = useState(true)

    const [retrieveRows, setRetrieveRows] = useState(true)

    // Column defaults
    columns.map((col) => {
        col.hideSortIcons = true
        col.sortable = false
        // col.headerClassName = 'data-header'
    })

    // Fetch sessions
    useEffect(() => {

        // Only fetch if set to retrieve rows
        if (!retrieveRows) return

        setLoading(true)
        fetch(`http://127.0.0.1:8080/api/session_view?rows=500&from=${rows.length}`)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)

                // Data formatting here
                data.map(function (obj: Record<string, unknown>): Record<string, unknown> {
                    // Rename 'session_id' to 'id'
                    obj['id'] = obj['session_id']
                    delete obj['session_id']

                    // Format time to JS date
                    const start_date = new Date( obj['end_time'] as number * 1000 )
                    obj['end_time'] = start_date.toLocaleString()

                    // Tracks
                    obj['track'] = obj['track_config'] === '' ? obj['track_name'] : `${obj['track_name']} - ${obj['track_config']}`

                    return obj
                })

                setRows(rows.concat(data))

                setLoading(false)
                setRetrieveRows(false)
            })
    }, [retrieveRows])

    return (
        <>
            <h2>Races</h2>
            <p style={{color: 'lightgrey'}}>Last 24 Hours</p>
            {/*<h1>💀</h1>*/}
            {/*<h1 className={"fuelvine-ad"}>DOWNLOAD FUELVINE NOW!!!!!!!!!!!!!!!!!!!!!!</h1>*/}
            <div className={"data-grid"}>
                <DataGrid
                    autoHeight
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={loading}
                    // sx={{color: 'white'}}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25]}
                    onPaginationModelChange={(model) => setRetrieveRows(changeRows(model, rows.length))}
                />
            </div>
        </>
    )
}

function changeRows(model: GridPaginationModel, rowCount: number): boolean {
    const totalPages = rowCount / model.pageSize
    const pagesLeft = totalPages - model.page

    console.log(pagesLeft)

    return pagesLeft <= 1;
}