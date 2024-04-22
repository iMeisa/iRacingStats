import {GridCol} from "./models/GridCol.ts";

export default function ColsByKey(cols: GridCol<any, any>[]): Record<string, GridCol<any, any>> {

    let colsByKey: Record<string, GridCol<any, any>> = {}
    for (const column of cols) {
        colsByKey[column.key] = column
    }

    return colsByKey
}
