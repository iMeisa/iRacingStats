import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type BoolIconProps = {
    value: boolean,
    positiveValue: boolean,  // The boolean value to be shown as green
}

export default function BoolIcon(props: BoolIconProps) {
    const color = props.value == props.positiveValue ? 'success' : 'error'
    return props.value ? <CheckIcon color={color} /> : <CloseIcon color={color} />
}
