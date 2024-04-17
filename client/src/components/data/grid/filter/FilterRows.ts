import {Filter} from "../models/Filter.ts";
import {filterFunctions} from "./FilterOperators.ts";
import {GridColType} from "@mui/x-data-grid";

export default function FilterRows(rows: Record<string, unknown>[], filters: Filter[]): Record<string, unknown>[] {
    const filterCount = filters.length

    if (filterCount < 1) return rows

    // Loop through rows
    let filteredRows: Record<string, unknown>[] = []
    for (const row of rows) {

        // Loop through filters per row
        let filtersSatisfied = 0
        for (const filter of filters) {
            console.log(filter)
            if (filterApplies(row, filter)) filtersSatisfied++
        }

        if (filtersSatisfied >= filterCount) filteredRows.push(row)
    }

    return filteredRows
}

/**
 * filterApplies returns boolean if the row complies with the filter
 * @param row
 * @param filter
 * @returns boolean if row complies with filter
 */
function filterApplies(row: Record<string, unknown>, filter: Filter): boolean {

    const dataType: GridColType = filter.type === undefined ? 'string' as GridColType : filter.type

    const originalValue = row[filter.col]
    const filterValue = filter.value

    console.log(row, row['type'], dataType, originalValue, filterValue)

    return filterFunctions[dataType][filter.operator](originalValue, filterValue)
}
