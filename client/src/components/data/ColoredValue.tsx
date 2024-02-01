import useMediaQuery from "@mui/material/useMediaQuery";

type ColoredValueProps = {
    positiveIsGood: boolean,
    value: number,
}

function PositiveColor(darkMode: boolean): string {
    return darkMode ?
        'springgreen':
        'limegreen'
}

function NegativeColor(darkMode: boolean): string {
    return darkMode ?
        'tomato' :
        'red'
}

function ValueColor(props: ColoredValueProps): string {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    if (props.value === 0) return 'inherit'

    const isGood = props.value > 0 && props.positiveIsGood
    return isGood ?
        PositiveColor(prefersDarkMode) :
        NegativeColor(prefersDarkMode)
}

export default function ColoredValue(props: ColoredValueProps) {

    const color = ValueColor(props)

    return <div style={{
            color: color,
            fontWeight: 'bold',
        }}
    >
        {props.value > 0 ? '+' : ''}
        {props.value}
    </div>
}