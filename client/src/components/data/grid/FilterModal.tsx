import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import {GridCol} from "./models/GridCol.ts";
import Box from "@mui/material/Box";
import useIsMobile from "../../../hooks/useIsMobile.ts";
import {GridColType} from "@mui/x-data-grid";

export interface FilterModalProps extends DialogProps {
    handleClose: () => void
    columns: GridCol<any, any>[]
}

const inputVariant = 'standard'

const filterOperators: Record<GridColType, string[]> = {
    string: [
        'contains',
        'equals',
        'starts with',
        'ends with',
        'is empty',
        'is not empty',
        'is any of',
    ],
    number: [
        '=',
        '≠',
        '>',
        '>=',
        '<',
        '<=',
        'is empty',
        'is not empty',
        'is any of',
    ],
    date: ['is'],
    dateTime: ['is'],
    boolean: ['is'],
    singleSelect: ['is'],
    actions: ['is'],
}

export default function FilterModal(props: FilterModalProps) {

    let colsByKey: Record<string, GridCol<any, any>> = {}
    for (const column of props.columns) {
        colsByKey[column.key] = column
    }

    const isMobile = useIsMobile()

    const [filterCol, setFilterCol] = useState('')

    const [filterOperator, setFilterOperator] = useState('0')
    const [filterOperatorList, setFilterOperatorList] = useState(['='])

    const [filterValue, setFilterValue] = useState('')

    const handleFilterColChange = (event: SelectChangeEvent) => {
        const colKey = event.target.value
        setFilterCol(colKey)
        setFilterOperator('0')

        let colType = colsByKey[colKey].type
        if (colType === undefined) setFilterOperatorList(filterOperators['string'])
        else setFilterOperatorList(filterOperators[colType])
    }

    const handleFilterOperatorChange = (event: SelectChangeEvent) => {
        setFilterOperator(event.target.value as string)
    }

    const handleClose = () => {
        setFilterCol('')
        setFilterOperator('')
        setFilterValue('')
        props.handleClose()
    }

    return <Dialog
        open={props.open}
        onClose={handleClose}
        // PaperProps={{
        //     component: 'form',
        //     onSubmit: (event: FormEvent<HTMLFormElement>) => {
        //         event.preventDefault();
        //         const formData = new FormData(event.currentTarget);
        //         const formJson = Object.fromEntries((formData as any).entries());
        //         const email = formJson.email;
        //         console.log(email);
        //         // props.onClose()
        //         props.handleClose();
        //     },
        // }}
        maxWidth='xl'
    >
        <DialogTitle textAlign='center'>Filter Column</DialogTitle>
        <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <Box
                display={
                    isMobile ? 'block' : 'flex'
                }
                gap={2}
            >
                <FormControl
                    fullWidth={isMobile}
                    sx={{
                        width: isMobile ? '100%' : '10em',
                        mt: 2
                    }}
                    variant={inputVariant}
                >
                    <InputLabel id='filter-col-select'>Column</InputLabel>
                    <Select
                        id='filter-col-select'
                        fullWidth
                        value={filterCol}
                        label='Column'
                        onChange={handleFilterColChange}
                    >
                        {props.columns.map(col => {
                            if (col.filterable === false) return

                            return <MenuItem value={col.key}>{col.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <FormControl
                    sx={{
                        width: isMobile ? '100%' : '10em',
                        mt: 1,
                    }}
                    fullWidth={isMobile}
                    variant={'filled'}
                >
                    <Select
                        id='filter-operator'
                        fullWidth
                        value={filterOperator}
                        disabled={filterCol.length < 1}
                        onChange={handleFilterOperatorChange}
                    >
                        {filterOperatorList.map((operator, index) =>
                           <MenuItem value={index}>{operator}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <FormControl
                    fullWidth={isMobile}
                    // sx={{ mt: -1 }}
                    variant={inputVariant}
                >
                    {/*<InputLabel id='filter-value'>Value</InputLabel>*/}
                    <TextField
                        id='filter-value'
                        sx={{ mt: 1 }}
                        fullWidth
                        label='Value'
                        disabled={filterCol.length < 1}
                        // onChange={handleFilterColChange}
                    >
                    </TextField>
                </FormControl>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color='error'>Cancel</Button>
            <Button type="submit">Confirm</Button>
        </DialogActions>
    </Dialog>
}
