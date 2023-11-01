import {useEffect, useState} from "react";

import {DataGrid, GridColDef, GridRenderCellParams,} from '@mui/x-data-grid';
import './Races.css'
import {LinearProgress} from "@mui/material";
import CurrentUrl from "../../variables/Url.ts";


const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <img src={"https://images-static.iracing.com/img/logos/series/"+params.value}  alt="logo" width={65}/>,
        sortable: false,
        headerAlign: 'center',
    },
    // { field: 'id', headerName: 'ID', width: 100},
    {
        field: 'series_short_name',
        headerName: '',
        headerAlign: 'center',
        width: 500,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <a
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit'}}
                href={`/sessions/${params.row.id}`}
            >
                {params.value}
            </a>
    },
    { field: 'subsession_count', headerName: 'Splits', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'end_time', headerName: '', width: 200, hideable: true },
    {
        field: 'end_time_formatted',
        headerName: 'End Time',
        width: 200
    },
    { field: 'track', headerName: 'Track', flex: 1, minWidth: 200 },
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
        const url = `${CurrentUrl()}/api/sessions`
        // console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)

                // Data formatting here
                data.map(function (obj: Record<string, unknown>): Record<string, unknown> {

                    // Format time to JS date
                    const start_date = new Date( obj['end_time'] as number * 1000 )
                    obj['end_time_formatted'] = start_date.toLocaleString()

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
            <p style={{color: 'darkgray'}}>Last 24 Hours</p>
            {/*<h1>💀</h1>*/}
            {/*<h1 className={"fuelvine-ad"}>DOWNLOAD FUELVINE NOW!!!!!!!!!!!!!!!!!!!!!!</h1>*/}
            <div className={"data-grid"}>
                <DataGrid
                    autoHeight
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={loading}
                    // sx={{color: 'inherit'}}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },

                        sorting: {
                            sortModel: [{field: 'end_time', sort: 'desc'}],
                        },

                        columns: {
                            columnVisibilityModel: {
                                end_time: false
                            }
                        }
                    }}
                    pageSizeOptions={[10, 25]}
                />
            </div>
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
