import Box from "@mui/material/Box";
import Favicon from "../../assets/favicon.svg"
import useWindowSize from "../../hooks/useWindowSize.ts";
import {grey} from "@mui/material/colors";
import './LoadingScreen.css'

export default function LoadingScreen() {
    const [width, height] = useWindowSize()

    return <>
        <Box
            display="flex"
            justifyContent="center"
            width={width}
            height={height}
            sx={{
                backgroundColor: grey[900]
            }}
        >
            <img
                className="bounce"
                src={Favicon}
                alt="icon"
                style={{
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    height: '18%',
                }}
            />
        </Box>
    </>
}
