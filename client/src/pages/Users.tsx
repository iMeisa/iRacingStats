import {LinearProgress, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import { useSearchParams} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import CurrentUrl from "../variables/Url.ts";

const columns: GridColDef[] = [
    {
        field: 'display_name',
        headerName: 'Name',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
    }
];


export default function Users() {

    const emptyRows: Record<string, unknown>[] = []
    const [rows, setRows] = useState(emptyRows);

    const [loading, setLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams({name: ""})
    const name = searchParams.get("name")

    // Fetch on name change
    useEffect(() => {

        console.log(name)
        if (name === null || name === "" || name.length < 2) {
            setRows(emptyRows)
            setLoading(false)
            return
        }
        setLoading(true)

        // Continue after delay is done
        const url = `${CurrentUrl()}/api/customers?display_name~=${name.replace('+', ' ')}`
        // console.log(url)
        const delayedFetch = setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((data: Record<string, unknown>[]) => {
                    console.log(data)

                    if (data === null) {
                        setRows(emptyRows)
                        return
                    }

                    // Data formatting here
                    data.map(function (obj: Record<string, unknown>): Record<string, unknown> {
                        // Rename 'session_id' to 'id'
                        obj['id'] = obj['cust_id']
                        delete obj['cust_id']

                        return obj
                    })

                    setRows(data)
                })
                .finally(() => {
                    setLoading(false)
                })

        }, 500)

        return () => clearTimeout(delayedFetch)
    }, [name]);


    return (
        <>
            {/*<h2>Users</h2>*/}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box className={"small-container"} sx={{mt: 10}}>
                    <TextField
                        fullWidth
                        label="Search user(s)"
                        type="search"
                        value={name}
                        onChange={event => setSearchParams(prev => {
                            prev.set("name", event.target.value)
                            return prev
                        }, {replace: true})}
                    />
                    <DataGrid
                        autoHeight
                        slots={{
                            loadingOverlay: LinearProgress,
                        }}
                        loading={loading}
                        sx={{
                            color: 'white',
                            mt: 5,
                        }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10]}

                    />

                </Box>

            </div>
        </>
    )
}
