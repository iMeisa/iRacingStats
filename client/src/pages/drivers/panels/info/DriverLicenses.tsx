import {License} from "../../../../models/driver/License.ts";
import CircularRating from "../../../../components/data/CircularRating.tsx";

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
            <CircularRating loading={props.loading} categoryId={1} license={props.licenses[1]}/>
            <CircularRating loading={props.loading} categoryId={5} license={props.licenses[5]}/>
            <CircularRating loading={props.loading} categoryId={6} license={props.licenses[6]}/>
            <CircularRating loading={props.loading} categoryId={3} license={props.licenses[3]}/>
            <CircularRating loading={props.loading} categoryId={4} license={props.licenses[4]}/>

        </div>
    </>
}
