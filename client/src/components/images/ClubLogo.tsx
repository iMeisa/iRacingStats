import LoadingImage from "./LoadingImage.tsx";

export default function ClubLogo( props: {id: number, clubName?: string}) {
    const paddedId = props.id.toString().padStart(3, '0')
    const source = `https://ir-core-sites.iracing.com/members/member_images/world_cup/club_logos/club_${paddedId}_long_0128_web.png`
    return <LoadingImage width={120} height={30} url={source} endpoint={''}/>
    // <img src={source} alt={props.clubName}/>
}
