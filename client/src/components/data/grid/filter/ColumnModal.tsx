import {GridCol} from "../models/GridCol.ts";
import {Checkbox, Dialog, DialogActions, DialogProps, FormControlLabel, FormGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {FormEvent} from "react";

interface ColumnModalProps extends DialogProps {
    handleClose: () => void
    columns: GridCol<any, any>[]
    hiddenColumns: string[],
    setHiddenColumns: Function,
}

export default function ColumnModal(props: ColumnModalProps) {

    const [_width, height] = useWindowSize()

    const handleClose = () => {
        props.handleClose()
    }

    const handleSubmit = (shownColumns: Record<string, string>) => {

        let newHiddenColumns: string[] = []
        for (const column of props.columns) {
            if (shownColumns[column.key] === 'on') continue

            newHiddenColumns.push(column.key)
        }

        props.handleClose()
        props.setHiddenColumns([...newHiddenColumns])
    }

    const columnHidden = (columnKey: string): boolean => {
        if (props.hiddenColumns === undefined) return false

        return props.hiddenColumns.includes(columnKey)
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
                console.log(formJson);
                handleSubmit(formJson)
            },
        }}
    >

        <Box
            ml={1}
            p={2}
            width={'15em'}
            maxHeight={height * 0.6}
            overflow='auto'
        >
            <FormGroup>
                { props.columns.map(column =>
                    <FormControlLabel
                        key={column.key}
                        name={column.key}
                        control={
                            <Checkbox defaultChecked={ !columnHidden(column.key) }/>
                        }
                        label={column.name}
                    />
                )}
            </FormGroup>
        </Box>

        <DialogActions>
            <Button onClick={handleClose} color='error'>Cancel</Button>
            <Button
                type="submit"
            >Confirm</Button>
        </DialogActions>
    </Dialog>
}
