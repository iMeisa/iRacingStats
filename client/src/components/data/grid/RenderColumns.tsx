import {GridCol} from "./models/GridCol.ts";
import Typography from "@mui/material/Typography";
import {ButtonGroup} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {DefaultFilter, Filter} from "./models/Filter.ts";
import {GridColType} from "@mui/x-data-grid";
import {SortCol} from "./models/SortCol.ts";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
// import Box from "@mui/material/Box";

export default function RenderColumns(
    cols: GridCol<any, any>[],
    setFilter: Function,
    sortCol: SortCol | null,
    setSort: (col: string, type: GridColType) => void,
    hiddenColumns: string[] | undefined,
): GridCol<any, any>[] {

    const sortIcon = (col: string, hideUnsorted?: boolean) => {
        if (sortCol === null || sortCol.colName !== col) return hideUnsorted ? <></> : <SwapVertIcon/>

        if (sortCol.ascending) return <ArrowRightAltIcon sx={{transform: 'rotate(-90deg)'}}/>

        return <ArrowRightAltIcon sx={{transform: 'rotate(90deg)'}}/>
    }

    if (hiddenColumns !== undefined) {
        cols = cols.filter(col => !hiddenColumns.includes(col.key))
    }

    return cols.map(col => {

        const filter: boolean = col.filterable !== false
        const sortable: boolean = col.sortable !== false

        // Forces min width to allow for filter and sort buttons if enabled
        const minWidth = (40 * Number(filter)) + (40 * Number(sortable))

        col = {
            ...col,
            minWidth: minWidth,
            headerCellClass:
                col.headerCellClass + ` ${filter ? 'filter' : ''} ${sortable ? 'sortable' : ''}` +
                ` header-align-${col.headerAlign}`,
            cellClass: col.cellClass + ` align-${col.align}`,
            renderHeaderCell: _p =>
                <>
                    <Typography variant = "h6" >
                        {col.hideName ? '' : col.name}
                    </Typography>

                    {/*<Box sx={{*/}
                    {/*    display: 'relative',*/}
                    {/*    // gridColumn: 2,*/}
                    {/*    // gridRow: 1,*/}
                    {/*    width: '100%',*/}
                    {/*    right: 0,*/}
                    {/*}}>*/}
                    {/*    {sortIcon(col.key, true)}*/}
                    {/*</Box>*/}

                    <ButtonGroup>
                    { filter ?
                        <IconButton onClick={() =>
                            setFilter({
                                ...DefaultFilter,
                                col: col.key,
                            } as Filter)
                        }>
                            <FilterAltIcon/>
                        </IconButton>
                        :
                        <></>
                    }
                    { sortable ?
                        <IconButton onClick={() => setSort(col.key, col.type === undefined ? 'string' : col.type)}>
                            {sortIcon(col.key)}
                        </IconButton>
                        :
                        <></>
                    }
                    </ButtonGroup>
                </>
        }

        return col
    })
}
