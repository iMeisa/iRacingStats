import {SortCol} from "../models/SortCol.ts";

export default function SortRows(rows: Record<string, unknown>[], sortCol: SortCol | null): Record<string, unknown>[] {
    // console.log(sortCol)

    let sortedRows = [...rows]
    if (sortCol === null) return sortedRows

    const colName = sortCol.colName
    switch (sortCol.type) {
        case 'number':
            // console.log('number')
            sortCol.ascending ?
                sortedRows.sort((a, b) =>
                    Number(a[colName]) - Number(b[colName])
                ) :
                sortedRows.sort((a, b) =>
                    Number(b[colName]) - Number(a[colName])
                )
            break

        default:
            // console.log('default')
            sortCol.ascending ?
                sortedRows.sort((a, b) =>
                    String(a[colName]).toLowerCase().localeCompare(String(b[colName]).toLowerCase())
                ) :
                sortedRows.sort((a, b) =>
                    String(b[colName]).toLowerCase().localeCompare(String(a[colName]).toLowerCase())
                )
            break
    }

    return sortedRows
}
