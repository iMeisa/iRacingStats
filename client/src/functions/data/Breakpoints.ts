import {useTheme} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export type ScreenSizes = {
    xs: boolean,
    sm: boolean,
    md: boolean,
    lg: boolean,
    xl: boolean,
}

export default function GetBreakpoints() {
    const themes = useTheme()

    let breakpoints: ScreenSizes = {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
    }

    breakpoints.xs = useMediaQuery(themes.breakpoints.up('xs'))
    breakpoints.sm = useMediaQuery(themes.breakpoints.up('sm'))
    breakpoints.md = useMediaQuery(themes.breakpoints.up('md'))
    breakpoints.lg = useMediaQuery(themes.breakpoints.up('lg'))
    breakpoints.xl = useMediaQuery(themes.breakpoints.up('xl'))

    return breakpoints
}
