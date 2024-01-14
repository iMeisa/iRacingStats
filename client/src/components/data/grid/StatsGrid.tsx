import {DataGrid, DataGridProps, GridNoRowsOverlay} from "@mui/x-data-grid";
import StatsGridToolbar from "./StatsGridToolbar.tsx";
import Box from "@mui/material/Box";

export default function StatsGrid(props: DataGridProps) {
    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                {...props}
                autoHeight
                slots={{
                    noRowsOverlay: GridNoRowsOverlay,
                    toolbar: StatsGridToolbar,
                }}
                loading={props.loading}
                sx={{
                    '--DataGrid-overlayHeight': '50px',
                    maxHeight: '75vh',
                }}
                disableColumnMenu
                pageSizeOptions={[]}

            />
        </Box>
    )
}
