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
import {Filter} from "./models/Filter.ts";
import CloseIcon from '@mui/icons-material/Close';

const filterHeight: string = '4em'

export default function StatsGrid(props: StatsGridProps<any>) {
    const [_width, height] = useWindowSize()
    const [open, setOpen] = useState(false)

    const [filterList, setFilterList] = useState<Filter[]>([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (filter: Filter) => {
        console.log(filter)

        let updatedFilters = filterList
        updatedFilters.push(filter)
        setFilterList(updatedFilters)
    }

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

                {/*Filter list*/}
                <Box
                    id='filter-list'
                    overflow='scroll'

                    display='flex'
                    justifyContent='start'
                    sx={{
                        width: '100%',
                        overflowY: 'hidden'
                    }}
                >
                    { filterList.map(filter => {
                        return (
                            <Box
                                display='flex'
                                whiteSpace='nowrap'
                                m={0.5}
                                border='1px solid lightskyblue'
                                borderRadius='0.5em'
                                p={1}
                                gap={1}
                            >
                                <strong>{filter.colName}</strong>
                                {/*{filter.colName} {filter.operator} {filter.value}*/}
                                {filter.operator}
                                <ins>{filter.value}</ins>
                                <IconButton sx={{ mt: -0.1, height: '1em', width: '1em' }}>
                                    <CloseIcon/>
                                </IconButton>
                            </Box>
                        )
                    })}
                </Box>

                <IconButton
                    sx={{
                        ml: 'auto',
                        mr: '5px',
                        height: '70%',
                        aspectRatio: 1,
                        top: '15%',
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
                handleSubmit={handleSubmit}
                columns={props.columns}
            />

        </Box>
    )
}
