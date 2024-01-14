import {DataGrid, DataGridProps, GridNoRowsOverlay} from "@mui/x-data-grid";
import StatsGridToolbar from "./StatsGridToolbar.tsx";
import Box from "@mui/material/Box";
// import {useEffect, useState} from "react";

export default function StatsGrid(props: DataGridProps) {
    // const emptyRow: GridRowsProp = [{
    //     id: 0,
    // }]
    // const [rows, setRows] = useState(emptyRow)
    //
    // useEffect(() => {
    //     if( props.rows.length > 0 ) setRows(props.rows)
    // }, [props.rows]);

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                {...props}
                // autoHeight
                slots={{
                    noRowsOverlay: GridNoRowsOverlay,
                    toolbar: StatsGridToolbar,
                }}
                // rows={rows}
                loading={props.loading}
                sx={{
                    '--DataGrid-overlayHeight': '50px',
                    maxHeight: '72vh',
                }}
                disableColumnMenu
                pageSizeOptions={[]}

            />
        </Box>
    )
}
