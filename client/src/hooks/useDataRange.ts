import useFetchObject from "./useFetchObject.ts";
import {DataRange as DataRangeModel, DefaultDataRange} from "../models/DataRange.ts";

export default function useDataRange() {
    return useFetchObject<DataRangeModel>(DefaultDataRange, '/api/data_range')
}
