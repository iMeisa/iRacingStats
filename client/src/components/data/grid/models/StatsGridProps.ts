import {DataGridProps} from "react-data-grid";
import {GridCol} from "./GridCol.ts";
import {Key} from "react";

export interface StatsGridProps<R, SR = unknown, K extends Key = Key>
    extends Omit<DataGridProps<R, SR, K>, 'columns' | 'rows'> {
    id: string
    columns: GridCol<R, SR>[]
    rows: Record<string, unknown>[]
    height?: number | string
    loading?: boolean
}
