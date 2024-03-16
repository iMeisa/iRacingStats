import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import 'react-circular-progressbar/dist/styles.css'
import {LicenseTertiaryColor} from "../../functions/img/LicenseColor.ts";
import {DefaultLicense, License} from "../../models/driver/License.ts";
import LicenseLevelGrade from "../../functions/strings/LicenseLevelGrade.ts";
import {Skeleton} from "@mui/material";

type CircularRatingProps = {
    loading: boolean
    categoryId: number
    license: License
}
export default function CircularRating(props: CircularRatingProps) {

    let license = props.license === undefined ? DefaultLicense : props.license

    let licenseLevel = props.loading ? 2 : license.level
    let subLevel = props.loading ? 0 : license.sub_level
    let irating = props.loading ? 1350 : license.irating

    return <>
        <div>
            <div
                style={{
                    width: 56,
                    height: 56,
                }}
            >
                <CircularProgressbarWithChildren
                    value={subLevel}
                    maxValue={499}
                    strokeWidth={11.5}
                    circleRatio={0.665}
                    styles={buildStyles({
                        rotation: 0.665,
                        strokeLinecap: 'butt',
                        pathColor: LicenseTertiaryColor(licenseLevel),
                        trailColor: '#23232b',
                    })}

                >
                    <div style={{
                        paddingTop: '8px',
                    }}>
                        {CategoryLogo(props.categoryId, 0, 24)}
                    </div>
                </CircularProgressbarWithChildren>

            </div>

            <div style={{
                color: LicenseTertiaryColor(licenseLevel),
                fontSize: '11px',
                fontWeight: '600',
                lineHeight: '14px',
            }}>
                <RatingText loading={props.loading} level={licenseLevel} subLevel={subLevel} irating={irating}/>
            </div>
        </div>
    </>
}

function RatingText(props: {loading: boolean, level: number, subLevel: number, irating: number}) {
    return <div style={{ marginTop: '-1.1em' }}>
        {
            props.loading ?
                <>
                    <Skeleton/>
                    <Skeleton/>
                </>
                :
                <>
                    <SafetyRating license_level={props.level} sr={props.subLevel}/>
                    iR {props.irating}
                </>
        }
    </div>
}

function SafetyRating(props: {license_level: number, sr: number}) {
    return <div>
        {LicenseLevelGrade(props.license_level)} {(props.sr / 100).toFixed(2)}
    </div>
}
