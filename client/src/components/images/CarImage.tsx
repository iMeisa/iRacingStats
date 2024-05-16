import {Car} from "../../models/Car.ts";
import Box from "@mui/material/Box";
import {CSSProperties} from "react";
import Typography from "@mui/material/Typography";

type CarImageProps = {
    car: Car
    width?: string | number
}
export default function CarImage(props: CarImageProps) {

    const logoStyles: CSSProperties = {
        position: 'absolute',
        maxHeight: '20%',
        maxWidth: '20%',
    }

    return <>
        <Box
            width={props.width ? props.width : '100%'}
            height='100%'
            mt={1}
            position='relative'
        >
            <img
                style={{
                    position: "relative",
                    borderRadius: '10px',
                    boxShadow: '0 0 5px 2px black',
                }}
                width={'95%'}
                alt={props.car.car_name}
                src={`https://images-static.iracing.com${props.car.folder}/${props.car.small_image}`}
            />
            <img
                style={{
                    ...logoStyles,
                    top: '5%',
                    right: '5%',
                }}
                alt={''}
                src={`https://images-static.iracing.com${props.car.sponsor_logo}`}
            />
            <img
                style={{
                    ...logoStyles,
                    bottom: '12%',
                    left: '6%',
                }}
                alt={''}
                src={`https://images-static.iracing.com${props.car.logo}`}
            />
            <Box
                height='100%'
                width='100%'
                sx={{
                    top: -7,
                    position: 'absolute',

                    borderRadius: '10px',

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    opacity: 0,
                    transition: 'opacity 0.2s',

                    '&:hover': {
                        opacity: 1,
                    },
                }}
            >
                <Typography
                    fontWeight='bold'
                    fontFamily={'Verdana'}
                    boxShadow='0 0 15px 15px black'
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: 'black',
                    }}
                >
                    {props.car.car_name}
                </Typography>
            </Box>
        </Box>
    </>
}
