import {Style} from 'javascript-time-ago'
import ReactTimeAgo from "react-time-ago";
// import {Tooltip} from "@mui/material";
// import {ReactElement} from "react";

type TimeAgoProps = {
    unixStamp: number,
    mini?: boolean,
    tooltip?: boolean,
}

// type WrapperProps = {
//     verboseDate: string,
//     children: ReactElement
// }

// const TooltipWrapper = ({verboseDate, children, ...rest}: WrapperProps) => {
//     console.log(rest)
//     return <Tooltip {...rest} title={verboseDate}>
//         {children}
//     </Tooltip>
// }

export default function UnixTimeAgo(props: TimeAgoProps) {

    const unixStamp = isNaN(props.unixStamp) ? 0 : props.unixStamp

    const tooltipEnabled = props.tooltip === undefined ? true : props.tooltip

    return <ReactTimeAgo
        date={ new Date(unixStamp * 1000) }
        locale={'en-US'}
        timeStyle={{
            labels: props.mini ? 'mini' : '',
            round: 'floor',
        } as Style}
        tooltip={tooltipEnabled}
    />
}
