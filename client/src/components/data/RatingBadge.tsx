import Box from "@mui/material/Box";
import {LicenseColor, LicenseSecondaryColor, LicenseTertiaryColor} from "../../functions/img/LicenseColor.ts";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";

function formatChange(old_num: number, new_num: number, decimal: boolean) {
    let change = new_num - old_num

    let changeFormatted: string
    if (decimal) changeFormatted = (change / 100).toFixed(2)
    else changeFormatted = change.toString()

    if (change >= 0) {
        changeFormatted = "+" + changeFormatted
    }

    return changeFormatted
}

export default function RatingBadge
    (props: {license: number, old_sr: number, new_sr: number, old_ir: number, new_ir: number}) {
    return <Box
        sx={{

            backgroundColor: LicenseColor(props.license, false),
            color: LicenseSecondaryColor(props.license, false),
            fontWeight: 500,
            paddingX: 1,
            paddingY: 0.25,

            border: 1,
            borderColor: LicenseTertiaryColor(props.license, false),

            borderRadius: 2,

            width: '12rem',

            display: 'flex',
            justifyContent: 'space-evenly'
        }}
    >
        <div style={{ height: '16px', display: 'block', marginTop: 'auto', marginBottom: 'auto' }}>
            {CategoryLogo(1, 0, 16)}
        </div>
        <strong>{props.new_sr / 100} {formatChange(props.old_sr, props.new_sr, true)}</strong>
        {props.new_ir} {formatChange(props.old_ir, props.new_ir, false)}
    </Box>
}
