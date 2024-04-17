import {GridColType} from "@mui/x-data-grid";

export type Filter = {
    col: string,
    colName: string,
    operator: string,
    value: string,
    type: GridColType,
}

export const DefaultFilter = {
    col: '',
    colName: '',
    operator: '',
    value: '',
    type: 'string'
}
