import TimeAgo, {Style} from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from "react-time-ago";

type TimeAgoProps = {
    unixStamp: number,
    mini?: boolean,
}

export default function UnixTimeAgo(props: TimeAgoProps) {
    TimeAgo.addDefaultLocale(en)

    return <ReactTimeAgo
        date={ new Date(props.unixStamp * 1000) }
        locale={'en-US'}
        timeStyle={{
            labels: props.mini ? 'mini' : '',
            round: 'floor',
        } as Style}
    />
}
