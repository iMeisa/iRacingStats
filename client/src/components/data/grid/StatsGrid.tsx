import 'react-data-grid/lib/styles.css'
import './StatsGrid.css'
import DataGrid from 'react-data-grid'
import Box from "@mui/material/Box";
import {StatsGridProps} from "./models/StatsGridProps.ts";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Typography from "@mui/material/Typography";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {ButtonGroup} from "@mui/material";

// function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
//     if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
//         event.stopPropagation();
//     }
// }
//
// const defaultWidth = 100

export default function StatsGrid(props: StatsGridProps<any>) {
    const [_width, height] = useWindowSize()

    let newCols = props.columns.map(col => {

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

                   <Typography variant="h6">
                       {col.hideName ? '' : col.name}
                   </Typography>

                   <ButtonGroup>
                       {filter ?
                           <IconButton>
                               <FilterAltIcon/>
                           </IconButton>
                           :
                           <></>
                       }
                       {sortable ?
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

    return (

        <Box
            mt={1}
            sx={{
                backgroundColor: '#1b1b1b',
                width: '100%',
                border: 'gray solid 1px',
                borderRadius: '10px',
                // borderTopLeftRadius: '10px',
            }}
        >
            <Box>
                hello
            </Box>

            <DataGrid
                style={{
                    // border: 'gray solid 1px',
                    // borderRadius: '10px',
                    height: props.height ? props.height : `${height * 0.7}px`
                }}
                rowHeight={40}
                // headerRowHeight={80}

                {...props}
                columns={newCols}
            />

            <Box>
                {props.rows.length} items
            </Box>
        </Box>
    )
}
