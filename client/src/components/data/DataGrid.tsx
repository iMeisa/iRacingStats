import {DataGrid, DataGridProps, GridToolbarFilterButton} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";

export default function StatsGrid(props: DataGridProps) {
    return (
        <DataGrid
            {...props}
            slots={{
                loadingOverlay: LinearProgress,
                toolbar: GridToolbarFilterButton,
            }}
            loading={props.loading}
            sx={{
                maxHeight: '75vh',
            }}
            // autoHeight
            disableColumnMenu
            pageSizeOptions={[]}

        />
    )
}
