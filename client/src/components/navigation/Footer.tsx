
// import discord from "../../assets/discord.svg"

import AppBar from "@mui/material/AppBar";
// import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
// import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {

    return <>
        <AppBar
            className={"footer"}
            position={"fixed"}
            sx={{
                top: 'auto',
                bottom: 0,
                display: {
                    xs: 'none',
                    md: 'flex',
                },
            }}
            color="transparent"
        >
            <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>


                {/*<Link href="https://github.com/iMeisa/iRacingStats"*/}
                {/*      color="inherit"*/}
                {/*      target="_blank"*/}
                {/*>*/}
                {/*    <Button color="inherit">*/}
                {/*        <GitHubIcon/>*/}
                {/*    </Button>*/}
                {/*</Link>*/}

                {/*<Link href="https://github.com/iMeisa/iRacingStats/commits/master"*/}
                {/*      color="inherit"*/}
                {/*      target="_blank"*/}
                {/*>*/}
                {/*    <Button color="inherit">*/}
                {/*        Changelog*/}
                {/*    </Button>*/}
                {/*</Link>*/}

                {/*"height: 60px !important;width: 217px !important;"*/}

                <a href="https://www.buymeacoffee.com/fuelvine" target="_blank">
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                        alt="Buy Me A Coffee"
                        style={{
                            height: "60px",
                            width: "217px"
                        }}
                    />
                </a>

                {/*<Button color="inherit">*/}
                {/*    <img src={discord} alt={discord} height={24}/>*/}
                {/*</Button>*/}
            </Toolbar>
        </AppBar>
    </>
}
