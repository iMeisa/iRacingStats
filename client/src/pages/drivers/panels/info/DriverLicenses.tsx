import {License} from "../../../../models/driver/License.ts";
import RatingGauge from "../../../../components/data/RatingGauge.tsx";

type DriverLicensesProps = {
    loading: boolean
    licenses: Record<number, License>
}

export default function DriverLicenses(props: DriverLicensesProps) {

    return <>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>
            <RatingGauge loading={props.loading} categoryId={1} license={props.licenses[1]}/>
            <RatingGauge loading={props.loading} categoryId={5} license={props.licenses[5]}/>
            <RatingGauge loading={props.loading} categoryId={6} license={props.licenses[6]}/>
            <RatingGauge loading={props.loading} categoryId={3} license={props.licenses[3]}/>
            <RatingGauge loading={props.loading} categoryId={4} license={props.licenses[4]}/>

        </div>
    </>
}
