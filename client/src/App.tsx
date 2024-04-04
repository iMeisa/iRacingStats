import './style/App.css'
import './style/DataGrid.css'
import * as React from 'react';
import ResponsiveAppBar from "./components/navigation/Navbar.tsx";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from './components/navigation/Routes.tsx';
import usePageHit from "./hooks/usePageHit.ts"
import UpdateContentCache from "./cache/UpdateContentCache.ts";
import {useEffect, useRef, useState} from "react";
import LoadingScreen from "./components/loading/LoadingScreen.tsx";


function App() {

    const [loading, setLoading] = useState(true)

    // On first render
    const isFirstRender = useRef<any>(true)
    useEffect(() => {
        if (isFirstRender.current) isFirstRender.current = false
        else return

        // Anything on first render here
        UpdateContentCache().then(() => setLoading(false))

    }, []);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    usePageHit()

    return (
        <>
            {
                loading ?
                    <LoadingScreen/>
                    :
                    <ThemeProvider theme={theme}>
                        <ResponsiveAppBar />
                        <CssBaseline />
                        <Routes />
                    </ThemeProvider>

            }
        </>
    )
}

export default App
