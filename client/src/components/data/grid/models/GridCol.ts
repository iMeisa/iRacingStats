import {Column} from "react-data-grid";
import {GridAlignment, GridColType} from "@mui/x-data-grid";

export interface GridCol<R, SR> extends Column<R, SR> {
    // field?: string
    align?: GridAlignment
    hideName?: boolean
    filterable?: boolean
    type?: GridColType
}
