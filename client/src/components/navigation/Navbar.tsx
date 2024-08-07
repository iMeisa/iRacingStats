import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import PeopleIcon from '@mui/icons-material/People';
import {Link} from 'react-router-dom'
import './Navbar.css'
import {Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import {useState} from "react";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";

const pages = ['Races', 'Series', 'Cars', 'Tracks', 'Drivers'];
const disabled = ['']

function pageDisabled(page: string): boolean {
    return disabled.includes(page.toLowerCase())
}

function pageLink(pageName: string) {
    return pageDisabled(pageName) ? '#' : `/${pageName.toLowerCase()}`
}

const pageIcons = (page: string) => {
    switch (page) {
        case 'Races':
            return <SportsScoreIcon/>
        case 'Series':
            return <FormatListBulletedIcon/>
        case 'Cars':
            return <DirectionsCarFilledIcon/>
        case 'Tracks':
            return <div style={{ width: '24px', height: '16px', display: 'flex', justifyContent: 'center' }}>
                {CategoryLogo(1, 0, 16)}
            </div>
        case 'Drivers':
            return <PeopleIcon/>
        default:
            return <></>
    }
}

function ResponsiveAppBar() {
    const [navOpen, setNavOpen] = useState<boolean>(false)

    const handleOpenNavMenu = () => {
        setNavOpen(true)
    };

    const handleCloseNavMenu = () => {
        setNavOpen(false);
    };

    const linkColor = (page: string) => {
        return window.location.pathname === pageLink(page) ?
            'skyblue' :
            'white'
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'center' }}>

                    {/*Desktop Nav*/}

                    <Link to='/'>
                        <StackedLineChartIcon
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                },
                                mr: 1,
                                color: 'white'
                            }}
                        />
                    </Link>

                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex'
                            },
                            mr: 1
                        }}
                    >
                        {pages.map((page) => (
                            <Link key={page} to={pageLink(page)}>
                                <Button
                                    disabled={pageDisabled(page)}
                                    className={'nav-item'}
                                    key={page}
                                    sx={{
                                        my: 2,
                                        color: linkColor(page),
                                        display: 'block',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    {/*Mobile Nav*/}

                    <Link to='/'>
                        <StackedLineChartIcon
                            sx={{
                                // flexGrow: 2,
                                display: {
                                    xs: 'flex',
                                    md: 'none',
                                },
                                color: 'white',
                            }}
                        />
                    </Link>

                    <Box sx={{display: {xs: 'flex', md: 'none'}, ml: 'auto'}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Drawer
                            anchor={'right'}
                            open={navOpen}
                            onClose={handleCloseNavMenu}
                        >
                            <List>
                                {pages.map((page) => (
                                    <Link key={page} to={pageLink(page)} style={{ color: linkColor(page) }}>
                                        <ListItem disablePadding>
                                            <ListItemButton
                                                onClick={handleCloseNavMenu}
                                                disabled={pageDisabled(page)}
                                            >
                                                {pageIcons(page)}
                                                <ListItemText style={{marginLeft: '3px'}} primary={page}/>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
