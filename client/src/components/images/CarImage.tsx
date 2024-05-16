import {Car} from "../../models/Car.ts";
import Box from "@mui/material/Box";
// import {SxProps} from "@mui/material";

type CarImageProps = {
    car: Car
    width?: string | number
    // sx?: SxProps
}
export default function CarImage(props: CarImageProps) {
    // const car = props.car

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
                    bottom: '12%',
                    left: '8%',
                    position: "absolute",
                    // height: '100%',
                }}
                height={'20%'}
                width={'20%'}
                alt={''}
                src={`https://images-static.iracing.com${props.car.logo}`}
            />
        </Box>
    </>
}
