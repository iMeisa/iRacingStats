import {Car} from "../../models/Car.ts";
import Box from "@mui/material/Box";
import {CSSProperties} from "react";
// import {SxProps} from "@mui/material";

type CarImageProps = {
    car: Car
    width?: string | number
    // sx?: SxProps
}
export default function CarImage(props: CarImageProps) {
    // const car = props.car

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
            // sx={props.sx}
        >
            <img
                style={{
                    // top: 0,
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
        </Box>
    </>
}
