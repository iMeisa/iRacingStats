import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {GridCol} from "./models/GridCol.ts";
import Box from "@mui/material/Box";
import useIsMobile from "../../../hooks/useIsMobile.ts";
import {GridColType} from "@mui/x-data-grid";
import {Filter} from "./models/Filter.ts";

export interface FilterModalProps extends DialogProps {
    handleClose: () => void
    handleSubmit: (filter: Filter) => void
    columns: GridCol<any, any>[]
    // rows: Record<string, unknown>[]
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

    // Object of columns by key
    let colsByKey: Record<string, GridCol<any, any>> = {}
    for (const column of props.columns) {
        colsByKey[column.key] = column
    }

    const isMobile = useIsMobile()

    const [filterCol, setFilterCol] = useState('')
    const [colType, setColType] = useState<GridColType>('string')

    const [filterOperator, setFilterOperator] = useState('0')
    const [filterOperatorList, setFilterOperatorList] = useState(['='])

    const [filterValue, setFilterValue] = useState('')

    // Filter column
    const handleFilterColChange = (event: SelectChangeEvent) => {
        const colKey = event.target.value  // Update select value
        setFilterCol(colKey)
        // Clear other inputs
        setFilterOperator('0')
        setFilterValue('')

        // Update operator list based on column type
        let colTypeRaw = colsByKey[colKey].type
        if (colTypeRaw === undefined) setColType('string')
        else setColType(colTypeRaw)

    }

    // Filter operator
    const handleFilterOperatorChange = (event: SelectChangeEvent) => {
        setFilterOperator(event.target.value as string)
    }

    // Updated filter operators on column type change
    useEffect(() => {
        setFilterOperatorList(filterOperators[colType])
    }, [colType]);

    // Filter value
    const handleFilterSelectValueChange = (event: SelectChangeEvent) => {
        setFilterValue(event.target.value as string)
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
        PaperProps={{
            component: 'form',
            onSubmit: (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                // console.log(formJson);
                props.handleSubmit({
                    col: formJson.column,
                    colName: colsByKey[formJson.column].name as string,
                    operator: filterOperators[colType][formJson.operator as number],
                    value: formJson.value
                })
                handleClose();
            },
        }}
        maxWidth='xl'
    >
        <DialogTitle textAlign='center'>Filter Column</DialogTitle>
        <DialogContent>
            <DialogContentText>
            </DialogContentText>

            <Box
                display={ isMobile ? 'block' : 'flex' }
                gap={2}
            >
                <FormControl
                    fullWidth={ isMobile }
                    sx={{
                        width: isMobile ? '100%' : '10em',
                        mt: 2
                    }}
                    variant={ inputVariant }
                >
                    <InputLabel id='filter-col-select'>Column</InputLabel>
                    <Select
                        id='filter-col-select'
                        fullWidth
                        required
                        value={ filterCol }
                        label='Column'
                        name='column'
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
                        required
                        value={filterOperator}
                        disabled={filterCol.length < 1}
                        name='operator'
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
                    {/*<InputLabel id='filter-value' sx={{mt: 4}}>Value</InputLabel>*/}
                    { colType === 'string' ?
                        <TextField
                            id='filter-value'
                            sx={{ mt: 1 }}
                            fullWidth
                            required
                            label='Value'
                            name='value'
                            disabled={filterCol.length < 1}
                        /> : <></>
                    }
                    { colType === 'number' ?
                        <Input
                            sx={{ mt: 4 }}
                            required
                            type='number'
                            name='value'
                            disabled={filterCol.length < 1}
                        /> : <></>
                    }
                    { colType === 'boolean' ?
                        <Select
                            id='filter-value'
                            sx={{
                                mt: 4,
                                minWidth: '5em',
                            }}
                            fullWidth
                            required
                            value={filterValue}
                            disabled={filterCol.length < 1}
                            name='value'
                            onChange={handleFilterSelectValueChange}
                        >
                            <MenuItem value={0}>Any</MenuItem>
                            <MenuItem value={1}>True</MenuItem>
                            <MenuItem value={2}>False</MenuItem>
                        </Select> : <></>
                    }
                </FormControl>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color='error'>Cancel</Button>
            <Button
                type="submit"
            >Confirm</Button>
        </DialogActions>
    </Dialog>
}
