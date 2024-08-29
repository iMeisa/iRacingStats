import useMediaQuery from "@mui/material/useMediaQuery";

// Returns if page theme is dark
export default function usePageTheme() {
    return useMediaQuery('(prefers-color-scheme: dark)')
}
