import './style/App.css'
import './style/DataGrid.css'
import * as React from 'react';
import ResponsiveAppBar from "./components/navigation/Navbar.tsx";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from './components/navigation/Routes.tsx';
import Footer from "./components/navigation/Footer.tsx";
import usePageHit from "./hooks/usePageHit.ts"


function App() {

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
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <CssBaseline />
                <Routes />
                <Footer />
            </ThemeProvider>
        </>
    )
}

export default App
