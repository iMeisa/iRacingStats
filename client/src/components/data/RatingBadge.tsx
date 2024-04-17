import Box from "@mui/material/Box";
import {LicenseColor, LicenseSecondaryColor, LicenseTertiaryColor} from "../../functions/img/LicenseColor.ts";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import {CircularProgress} from "@mui/material";

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
    category: number,
    loading: boolean,
    license?: number,
    old_sr?: number,
    safety_rating?: number,
    old_ir?: number,
    irating?: number,
    show_change?: boolean,
}

export default function RatingBadge(props: RatingBadgeProps) {

    // props defaults
    const license = props.license ? props.license : 2
    const old_sr = props.old_sr ? props.old_sr : 0
    const safety_rating = props.safety_rating ? props.safety_rating : 250
    const old_ir = props.old_ir ? props.old_ir : 0
    const irating = props.irating ? props.irating : 1350
    const show_change = props.show_change ? props.show_change : false

    const rookieRatings = [-1, 1350]
    const iratingEstimated = license < 4 && !rookieRatings.includes(irating)

    return <Box
        sx={{

            backgroundColor: LicenseColor(license, false),
            color: LicenseSecondaryColor(license, false),
            fontWeight: 500,
            fontSize: '1em',
            paddingX: 1,
            // paddingY: 0.5,
            marginY: 'auto',

            border: 1,
            borderColor: LicenseTertiaryColor(license, false),

            borderRadius: 2,

            width: show_change ? '12rem' : '7.5rem',
            height: '25px',
            lineHeight: '23px',

            display: 'flex',
            justifyContent: 'space-around',

            textAlign: 'center',
        }}
    >
        <div style={{ height: '18px', display: 'block', marginTop: 'auto', marginBottom: 'auto' }}>
            {CategoryLogo(props.category, 0, 18)}
        </div>

        { props.loading ? <CircularProgress size="1em" sx={{ my: 'auto', color: LicenseSecondaryColor(license) }} /> : <>
            <strong style={{ textAlign: 'center' }}>{(safety_rating / 100).toFixed(2)}</strong>
            <strong style={{ textAlign: 'center' }}>{ show_change ? formatChange(old_sr, safety_rating, true) : ''}</strong>
            { iratingEstimated ? `~${irating}` : irating} { show_change ? formatChange(old_ir, irating, false) : '' }
        </>
        }

    </Box>
}
