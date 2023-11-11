import Box from "@mui/material/Box";
import {LicenseColor, LicenseSecondaryColor, LicenseTertiaryColor} from "../../functions/img/LicenseColor.ts";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";

function formatChange(old_num: number, new_num: number, decimal: boolean) {

    if (old_num === 0) return ''

    let change = new_num - old_num

    let changeFormatted: string
    if (decimal) changeFormatted = (change / 100).toFixed(2)
    else changeFormatted = change.toString()

    if (change >= 0) {
        changeFormatted = "+" + changeFormatted
    }

    return changeFormatted
}

type RatingBadgeProps = {
    license: number,
    old_sr?: number,
    safety_rating: number,
    old_ir?: number,
    irating: number,
    show_change: boolean,
}

export default function RatingBadge(props: RatingBadgeProps) {
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

            width:  props.show_change ? '12rem' : '7.5rem',

            display: 'flex',
            justifyContent: 'space-evenly'
        }}
    >
        <div style={{ height: '16px', display: 'block', marginTop: 'auto', marginBottom: 'auto' }}>
            {CategoryLogo(1, 0, 16)}
        </div>
        <strong>{(props.safety_rating / 100).toFixed(2)}</strong>
        <strong>{ props.show_change ? formatChange(props.old_sr ? props.old_sr : 0, 0, true) : ''}</strong>
        {props.irating} { props.show_change ? formatChange(props.old_ir ? props.old_ir : 0, props.irating, false) : '' }
    </Box>
}
