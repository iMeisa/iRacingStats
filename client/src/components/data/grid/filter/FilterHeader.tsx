import {Filter} from "../models/Filter.ts";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Tooltip} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import CircleIcon from '@mui/icons-material/Circle';

type FilterHeaderProps = {
    handleClickOpenFilter: () => void
    filterList: Filter[]
    removeFilter: (index: number) => void

    handleClickOpenColumns: () => void
    hiddenColumnCount: number
}

export default function FilterHeader(props: FilterHeaderProps) {
    return (
        <Box display='flex' >

            {/*Filter button*/}
            <Tooltip title='Add filter'>
                <Box sx={{
                    my: 'auto',
                    mx: '2px',
                }} >
                    <IconButton
                        color='success'
                        onClick={props.handleClickOpenFilter}
                    >
                        <FilterAltIcon/>
                    </IconButton>
                </Box>
            </Tooltip>


            {/*Filter list*/}
            <Box
                id='filter-list'
                display='flex'
                justifyContent='start'
                sx={{
                    width: '100%',
                    overflowY: 'hidden'
                }}
            >
                { props.filterList.map((filter, index) => {
                    return (
                        <Box
                            key={index}
                            display='flex'
                            whiteSpace='nowrap'
                            my={0.5}
                            mx={0.5}
                            border='1px solid lightskyblue'
                            borderRadius='0.5em'
                            height='2.5em'
                            p={1}
                            gap={1}
                        >
                            <strong>{filter.colName}</strong>
                            {filter.operator}
                            <ins>{filter.value}</ins>

                            <IconButton
                                sx={{ my: 'auto', height: '1em', width: '1em' }}
                                onClick={() => props.removeFilter(index)}
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    )
                })}
            </Box>

            <Tooltip title='Columns'>
                <Box sx={{
                    my: 'auto',
                    mx: '2px',
                }}>

                    <IconButton
                        color='info'
                        onClick={props.handleClickOpenColumns}
                    >
                        <Box position='relative' height={24} width={24}>
                            <ViewColumnIcon/>

                            { props.hiddenColumnCount > 0 ?
                                <Box
                                    position='absolute'
                                    top={-11}
                                    right={-3}
                                    // height={10}
                                >
                                    <CircleIcon
                                        fontSize={'small'}
                                        color='info'
                                        sx={{
                                            boxShadow: 'inset 0 0 20em #1b1b1b',
                                            borderRadius: '50%',
                                            height: 15,
                                            width: 15,
                                        }}
                                    />
                                </Box> : <></>
                            }
                        </Box>
                    </IconButton>
                </Box>
            </Tooltip>
        </Box>
    )
}
