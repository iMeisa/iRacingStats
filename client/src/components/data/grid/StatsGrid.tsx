import 'react-data-grid/lib/styles.css'
import './StatsGrid.css'
import DataGrid from 'react-data-grid'
import Box from "@mui/material/Box";
import {StatsGridProps} from "./models/StatsGridProps.ts";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import RenderColumns from "./RenderColumns.tsx";
import {useState} from "react";
import FilterModal from "./FilterModal.tsx";
import {DefaultFilter, Filter} from "./models/Filter.ts";
import FilterHeader from "./FilterHeader.tsx";
import FilterRows from "./filter/FilterRows.ts";

export default function StatsGrid(props: StatsGridProps<any>) {
    const [_width, height] = useWindowSize()
    const [open, setOpen] = useState(false)

    const [filterList, setFilterList] = useState<Filter[]>([])
    const [editFilter, _setEditFilter] = useState<Filter>(DefaultFilter)

    const filteredRows = FilterRows(props.rows, filterList)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = (filter: Filter) => setFilterList([ ...filterList, filter])
    const removeFilter = (index: number) =>
        setFilterList(oldFilters =>
            oldFilters.filter((_, i) => i !== index)
        )

    let newCols = RenderColumns(props.columns)

    return (

        <Box
            mt={1}
            sx={{
                backgroundColor: '#1b1b1b',
                width: '100%',
                border: 'gray solid 1px',
                borderRadius: '10px',
                color: '#eee'
            }}
        >

            <FilterHeader
                handleClickOpen={handleClickOpen}
                filterList={filterList}
                removeFilter={removeFilter}
            />

            <DataGrid
                style={{
                    height: props.height ? props.height : `${height * 0.70}px`,
                    color: '#eee'
                }}
                rowHeight={40}

                {...props}
                rows={filteredRows}
                columns={newCols}
            />

            <Box>
                {props.rows.length} rows
            </Box>

            <FilterModal
                open={open}
                onClose={handleClose}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                columns={props.columns}
                editFilter={editFilter}
            />

        </Box>
    )
}
