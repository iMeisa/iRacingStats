import './App.css'
import * as React from 'react';
import ResponsiveAppBar from "./components/Navbar.tsx";
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from './components/Routes.tsx';
import Footer from "./components/Footer.tsx";


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

    return (
        <>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar/>
                <CssBaseline />
                <Routes />
                <Footer/>
            </ThemeProvider>
        </>
    )
}

export default App
