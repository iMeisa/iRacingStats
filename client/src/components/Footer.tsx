// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import {useState} from "react";

import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {

    return <>
        <AppBar className={"footer"} position={"fixed"} sx={{ top: 'auto', bottom: 0 }} color="transparent">
            <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>


                <Link href="https://github.com/iMeisa/iRacingStats"
                      color="inherit"
                      target="_blank"
                >
                    <Button color="inherit">
                        <GitHubIcon/>
                    </Button>
                </Link>

                <Link href="https://github.com/iMeisa/iRacingStats/commits/master"
                      color="inherit"
                      target="_blank"
                >
                    <Button color="inherit">
                        Changelog
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    </>
}
