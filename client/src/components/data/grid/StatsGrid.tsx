import {DataGrid, DataGridProps} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";
import StatsGridToolbar from "./StatsGridToolbar.tsx";

export default function StatsGrid(props: DataGridProps) {
    return (
        <DataGrid
            {...props}
            slots={{
                loadingOverlay: LinearProgress,
                toolbar: StatsGridToolbar,
            }}
            loading={props.loading}
            sx={{
                minHeight: '100px',
                maxHeight: '75vh',
            }}
            disableColumnMenu
            pageSizeOptions={[]}

        />
    )
}
