import {Column} from "react-data-grid";
import {Maybe} from "../../../../models/Maybe.ts";

export interface GridCol<R, SR> extends Column<R, SR> {
    filterable?: Maybe<boolean>
}
