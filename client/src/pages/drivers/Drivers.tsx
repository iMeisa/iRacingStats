import {LinearProgress, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import CurrentUrl from "../../variables/Url.ts";
import Container from "@mui/material/Container";

const columns: GridColDef[] = [
    {
        field: 'display_name',
        headerName: 'Name',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        renderCell: params =>
            <Link
                style={{ color: 'inherit' }}
                to={`/user/${params.row.id}`}
            >{params.value}</Link>
    }
];


export default function Drivers() {

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
        const url = `${CurrentUrl()}/api/customers?display_name=${name.replace('+', ' ')}`
        console.log(url)
        const delayedFetch = setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((data: Record<string, unknown>[]) => {
                    console.log(data)

                    if (data === null) {
                        setRows(emptyRows)
                        return
                    }

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
            {/*<h2>users</h2>*/}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="sm" sx={{mt: 5}}>
                    <TextField
                        fullWidth
                        label="Search driver(s)"
                        type="search"
                        value={name}
                        onChange={event => setSearchParams(prev => {
                            prev.set("name", event.target.value)
                            return prev
                        }, {replace: true})}
                    />
                    <DataGrid
                        slots={{
                            loadingOverlay: LinearProgress,
                        }}
                        loading={loading}
                        sx={{
                            color: 'inherit',
                            mt: 3,
                        }}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            sorting: {
                                sortModel: [{field: 'display_name', sort: 'asc'}],
                            },
                        }}

                        onCellClick={
                            (
                                params,
                                _,
                                __
                            ) => <Link to={`/user/${params.id}`}/>
                        }
                    />

                </Container>

            </div>
        </>
    )
}
