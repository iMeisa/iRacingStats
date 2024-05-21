import {SortCol} from "../components/data/grid/models/SortCol.ts";
import {Filter} from "../components/data/grid/models/Filter.ts";

export type GridSettings = {
    sort: SortCol | null
    filters: Filter[]
    hiddenColumns: string[]
}
