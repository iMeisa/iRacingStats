import {Input, InputAdornment, LinearProgress} from "@mui/material";
import {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import CurrentUrl from "../../variables/Url.ts";
import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import RecentDrivers from "../../storage/RecentDrivers.ts";

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
                to={`/driver/${params.row.id}`}
            >{params.value}</Link>
    }
];


export default function Drivers() {

    const [rows, setRows] = useState(RecentDrivers());

    const [loading, setLoading] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams({name: ""})
    const name = searchParams.get("name")
    const [inputName, setInputName] = useState(name === null ? '' : name)
    const [searchName, setSearchName] = useState(inputName)

    const handleSubmit = () => {
        if (inputName.length < 2) return

        setSearchName(inputName)
    }

    // Fetch on name change
    useEffect(() => {

        setSearchParams(prev => {
            prev.set("name", searchName)
            return prev
        }, {replace: true})

        if (searchName === null || searchName === "" || searchName.length < 2) {
            setRows(RecentDrivers())
            setLoading(false)
            return
        }
        setLoading(true)

        // Continue after delay is done
        const url = `${CurrentUrl()}/api/customers?display_name=${searchName.replace('+', ' ')}`
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)

                if (data === null) {
                    setRows(RecentDrivers())
                    return
                }

                setRows(data)
            })
            .finally(() => {
                setLoading(false)
            })


    }, [searchName]);


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
                    <Input
                        fullWidth
                        value={inputName}
                        type="search"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSubmit}
                                    edge="end"
                                >
                                    <SearchIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={event => {
                            setInputName(event.target.value)
                        }}

                        onKeyDown={event => {
                            if (event.key !== "Enter") return

                            handleSubmit()
                        }}
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
                        // initialState={{
                        //     sorting: {
                        //         sortModel: [{field: 'display_name', sort: 'asc'}],
                        //     },
                        // }}

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
