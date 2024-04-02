import {DataGridProps} from "react-data-grid";
import {GridCol} from "./GridCol.ts";
import {Key} from "react";

export interface StatsGridProps<R, SR = unknown, K extends Key = Key> extends DataGridProps<R, SR, K> {
    columns: GridCol<R, SR>[]
    height?: number | string
    loading?: boolean
}
