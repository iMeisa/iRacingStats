import 'react-data-grid/lib/styles.css'
import './StatsGrid.css'
import DataGrid from 'react-data-grid'
import Box from "@mui/material/Box";
import React from "react";
import FilterRenderer from "./FilterRenderer.tsx";
import {StatsGridProps} from "./models/StatsGridProps.ts";
import useWindowSize from "../../../hooks/useWindowSize.ts";

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.stopPropagation();
    }
}

export default function StatsGrid(props: StatsGridProps<any>) {
    const [_width, height] = useWindowSize()
    // const emptyRow: GridRowsProp = [{
    //     id: 0,
    // }]
    // const [rows, setRows] = useState(emptyRow)
    //
    // useEffect(() => {
    //     if( props.rows.length > 0 ) setRows(props.rows)
    // }, [props.rows]);

    let newCols = props.columns.map(col => {
        const filter: boolean = col.filterable !== false
        col = {
           ...col,
           headerCellClass: filter ? col.headerCellClass + ' filter' : col.headerCellClass,
           renderHeaderCell: p => filter ?
               <FilterRenderer<Row> {...p}>
                   {({ filters, ...rest }) => (
                       <input
                           {...rest}
                           // className={filterClassname}
                           // value={filters.task}
                           // onChange={(e) =>
                           //     setFilters({
                           //         ...filters,
                           //         task: e.target.value
                           //     })
                           // }
                           onKeyDown={inputStopPropagation}
                       />
                   )}
               </FilterRenderer>
               :
               col.name

        }
        return col
    })

    return (

        <Box mt={1} sx={{ width: '100%' }}>
            <DataGrid
                style={{
                    border: 'gray solid 1px',
                    borderRadius: '10px',
                    height: `${height * 0.7}px`
                }}
                rowHeight={40}
                headerRowHeight={80}

                {...props}
                columns={newCols}
            />
        </Box>
    )
}
