import Box from "@mui/material/Box";
import {LinearProgress, Tab} from "@mui/material";
import React, {useEffect, useState} from "react";
import TabPanel from '@mui/lab/TabPanel';
import {TabContext, TabList} from "@mui/lab";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

// function a11yProps(index: number) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

const columns: GridColDef[] = [
    {
        field: 'car_name',
        headerName: 'Car Name',
        flex: 1,
    },
    {
        field: 'use_count',
        headerName: 'Use Count',
        flex: 1,
        // align: 'center',
    },
    // {
    //     field: 'series_short_name',
    //     headerName: 'series',
    //     width: 500,
    //     renderCell: (params: GridRenderCellParams<any, string>) =>
    //         <a style={{color: 'white', textDecoration: 'underline', fontStyle: 'italic'}} href={`/sessions/${params.row.id}`}>{params.value}</a>
    // },
];

export default function Cars() {
    const [value, setValue] = useState('1');

    const emptyRows: Record<string, unknown>[] = []
    const [rows, setRows] = useState(emptyRows);

    const [loading, setLoading] = useState(true)

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    // Fetch sessions
    useEffect(() => {

        fetch(`http://127.0.0.1:8080/api/cars_view?rows=500`)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)

                // Data formatting here
                data.map(function (obj: Record<string, unknown>): Record<string, unknown> {
                    // Rename 'session_id' to 'id'
                    obj['id'] = obj['car_id']
                    delete obj['car_id']

                    return obj
                })

                setRows(data)

                setLoading(false)
            })
    }, [])

    return (
        <>
            {/*<h1>Cars</h1>*/}
            <Box className={"container"} sx={{ width: '100%'}}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                            <Tab label="Cars" value="1" />
                            <Tab label="Classes" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <DataGrid
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            loading={loading}
                            sx={{color: 'white'}}
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[10, 25]}
                            // onPaginationModelChange={(model) => setRetrieveRows(changeRows(model, rows.length))}
                        />
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                </TabContext>
            </Box>
        </>
    )
}
