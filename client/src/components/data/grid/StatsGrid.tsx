import 'react-data-grid/lib/styles.css'
import './StatsGrid.css'
import DataGrid from 'react-data-grid'
import Box from "@mui/material/Box";
import {StatsGridProps} from "./models/StatsGridProps.ts";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import RenderColumns from "./RenderColumns.tsx";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import FilterModal from "./FilterModal.tsx";

const filterHeight: string = '3em'

export default function StatsGrid(props: StatsGridProps<any>) {
    const [_width, height] = useWindowSize()
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            {/*Filter Box*/}
            <Box height={filterHeight} display='flex'>
                <Box
                    height={filterHeight}
                    lineHeight={filterHeight}
                    borderRight='1px solid grey'
                    width='3.75em'
                    mr='auto'
                    fontWeight='bold'
                >
                    Filter:
                </Box>

                <Box
                    id='filter-list'
                    overflow='auto'
                    display='inline'
                />

                <IconButton
                    id='add-filter'
                    sx={{
                        ml: 'auto',
                        width: 48,
                    }}
                    color='success'
                    onClick={handleClickOpen}
                >
                    <AddIcon/>
                </IconButton>
            </Box>

            <DataGrid
                style={{
                    height: props.height ? props.height : `${height * 0.70}px`,
                    color: '#eee'
                }}
                rowHeight={40}

                {...props}
                columns={newCols}
            />

            <Box>
                {props.rows.length} rows
            </Box>

            <FilterModal
                open={open}
                onClose={handleClose}
                handleClose={handleClose}
                columns={props.columns}
            />

        </Box>
    )
}
