import {Column} from "react-data-grid";

export interface GridCol<R, SR> extends Column<R, SR> {
    hideName?: boolean
    filterable?: boolean
}
