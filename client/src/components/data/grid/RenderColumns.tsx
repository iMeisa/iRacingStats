import {GridCol} from "./models/GridCol.ts";
import Typography from "@mui/material/Typography";
import {ButtonGroup} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";

export default function RenderColumns(cols: GridCol<any, any>[]): GridCol<any, any>[] {
    return cols.map(col => {

        const filter: boolean = col.filterable !== false
        const sortable: boolean = col.sortable !== false

        // Forces min width to allow for filter and sort buttons if enabled
        const minWidth = (40 * Number(filter)) + (40 * Number(sortable))

        col = {
            ...col,
            minWidth: minWidth,
            headerCellClass: col.headerCellClass + ` ${filter ? 'filter' : ''} ${sortable ? 'sortable' : ''}`,
            cellClass: col.cellClass + ` align-${col.align}`,
            renderHeaderCell: _p =>
                <>
                    <Typography variant = "h6" >
                        {col.hideName ? '' : col.name}
                    </Typography>

                    <ButtonGroup>
                    { filter ?
                        <IconButton>
                            <FilterAltIcon/>
                        </IconButton>
                        :
                        <></>
                    }
                    { sortable ?
                        <IconButton>
                            <SwapVertIcon/>
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
