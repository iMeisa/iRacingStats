import 'react-data-grid/lib/styles.css'
import './StatsGrid.css'
import DataGrid from 'react-data-grid'
import Box from "@mui/material/Box";
import {StatsGridProps} from "./models/StatsGridProps.ts";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import RenderColumns from "./RenderColumns.tsx";
import {useEffect, useState} from "react";
import FilterModal from "./filter/FilterModal.tsx";
import {DefaultFilter, Filter} from "./models/Filter.ts";
import FilterHeader from "./filter/FilterHeader.tsx";
import FilterRows from "./filter/FilterRows.ts";
import SortRows from "./filter/SortRows.ts";
import {SortCol} from "./models/SortCol.ts";
import {GridColType} from "@mui/x-data-grid";
import RenderLoading from "./RenderLoading.tsx";
import {EmptyRowsRenderer} from "./EmptyRowsRenderer.tsx";
import GetGridSettings from "../../../storage/dataGrid/GetGridSettings.ts";
import SaveGridSettings from "../../../storage/dataGrid/SaveGridSettings.ts";

export default function StatsGrid(props: StatsGridProps<any>) {
    const [_width, height] = useWindowSize()
    const heightPercentage = props.height === undefined ? 0.7 : props.height
    const gridHeight: string = (height * heightPercentage) + 'px'
    const [open, setOpen] = useState(false)

    const initialSettings = GetGridSettings(props.id)

    const [sortCol, setSortCol] =
        useState<SortCol | null>(initialSettings.sort)

    const [filterList, setFilterList] =
        useState<Filter[]>(initialSettings.filters)
    const [editFilter, setEditFilter] = useState<Filter>(DefaultFilter)

    const sortedRows = SortRows(props.rows, sortCol)
    const filteredRows = FilterRows(sortedRows, filterList)

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => {
        setEditFilter(DefaultFilter)
        setOpen(false)
    }

    const handleUpdateSort = (col: string, type: GridColType) => {

        // New sort if no selected column or different selected column
        if (sortCol === null || sortCol.colName !== col) {

            setSortCol({
                colName: col,
                ascending: true,
                type: type,
            })

            return
        }

        // Remove filter if set to descending
        if (!sortCol.ascending) {
            setSortCol(null)
            return
        }

        // Set to descending
        setSortCol({
            ...sortCol,
            ascending: false,
        })
    }

    const handleSubmit = (filter: Filter) => setFilterList([ ...filterList, filter])
    const removeFilter = (index: number) =>
        setFilterList(oldFilters =>
            oldFilters.filter((_, i) => i !== index)
        )

    const handleEditFilter = (filter: Filter) => {
        setEditFilter(filter)
        setOpen(true)
    }

    let renderedColumns = RenderColumns(
        props.columns,
        handleEditFilter,
        sortCol,
        handleUpdateSort,
    )

    useEffect(() => {
        console.log(editFilter)
    }, [editFilter]);

    // Save grid filters and sort column
    useEffect(() => {
        if (props.id === undefined) return

        SaveGridSettings(props.id, {
            sort: sortCol,
            filters: filterList,
        })
    }, [sortCol, filterList])

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

            {props.loading ? <RenderLoading height={gridHeight}/> :
                <DataGrid
                    style={{
                        height: gridHeight,
                        color: '#eee'
                    }}
                    rowHeight={40}

                    {...props}

                    renderers={{
                        noRowsFallback: <EmptyRowsRenderer/>
                    }}
                    rows={filteredRows}
                    columns={renderedColumns}
                />
            }

            <Box>
                {filteredRows.length} rows
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
