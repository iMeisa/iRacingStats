import {GridColType} from "@mui/x-data-grid";

export type SortCol = {
    colName: string,
    ascending: boolean,
    type: GridColType,
}
