import {LicenseTertiaryColor} from "./LicenseColor.ts";
// import {LicenseSecondaryColor} from "./LicenseColor.ts";

export default function CategoryLogo(id: number, licenseLevel: number = 0, size: number = 25) {

    // console.log("level", licenseLevel)

    let path: string
    switch (id) {
        case 1:
            path = "M8 0a8 8 0 00-8 8v7a1 1 0 001 1h2a1 1 0 001-1V8c0-2.206 1.794-4 4-4s4 1.794 4 4v7a1 1 0 001 1h2a1 1 0 001-1V8a8 8 0 00-8-8z"
            break
        case 2:
            path = "M11.1,6.2C9.8,5.9,8.4,5.5,7,5C6.6,4.9,5.6,4.5,5.4,3.9c0-0.1-0.1-0.3,0-0.6c0.4-1,1.9-2,2.5-2.3c0.2-0.1,0.3-0.4,0.2-0.6C8,0.2,7.8,0,7.5,0.1c-0.1,0-2,0.3-4.1,2.2C2.7,2.9,2.6,3.6,2.6,4.1c0.1,1.3,1.5,2.5,2.3,3c1.7,1,3.2,1.5,4.3,1.8c1.5,0.5,2,0.7,2,1.3c0,2.2-5.1,3.5-8.8,4.4c-0.7,0.2-1.3,0.3-1.9,0.5c-0.2,0.1-0.4,0.3-0.4,0.5S0.3,16,0.6,16h9.8c0.2-0.1,5.6-1.8,5.6-6.2C16.3,7.4,13.9,6.8,11.1,6.2L11.1,6.2z"
            break
        case 3:
            path = "M15.8 7.6L15 4.4C14.1 1.2 10.9-.7 7.7.2l-3.3.9C1.2 1.9-.7 5.2.2 8.4l.8 3.2c.9 3.2 4.1 5.1 7.3 4.2l3.2-.8c3.3-.9 5.2-4.2 4.3-7.4zM13 12c0 .6-.4 1-1 1h-.5c-.6 0-1-.4-1-1V8c0-1.5-1.3-2.6-2.8-2.5-1.3.2-2.2 1.3-2.2 2.7V12c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V8.2C3 5.6 4.9 3.3 7.5 3c3-.3 5.5 2.1 5.5 5v4z"
            break
        case 4:
            path = "M15.8 7.6L15 4.4C14.1 1.2 10.9-.7 7.7.2l-3.3.9C1.2 1.9-.7 5.2.2 8.4l.8 3.2c.9 3.2 4.1 5.1 7.3 4.2l3.2-.8c3.3-.9 5.2-4.2 4.3-7.4zM9.5 13c-.1 0-.1 0 0 0H3.3c-.1 0-.3-.1-.3-.3 0-.2.1-.3.2-.3l1.2-.3c2.3-.6 5.5-1.4 5.5-2.8 0-.4-.3-.5-1.3-.8C8 8.3 7 8 6 7.3c-.6-.3-1.4-1-1.5-1.8 0-.3 0-.7.5-1.1C6.3 3.2 7.5 3 7.5 3c.1 0 .3.1.3.2s0 .3-.2.4c-.2.2-1.1.8-1.4 1.4-.1.2 0 .3 0 .4.1.3.8.6 1 .7.9.3 1.8.6 2.5.7 1.8.5 3.3.9 3.3 2.3 0 2.8-3.4 3.8-3.5 3.9z"
            break
        default:
            return <></>
    }


    const licenseColor = licenseLevel === 0 ? 'currentColor' : LicenseTertiaryColor(licenseLevel)
    // console.log(licenseColor)

    return <>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            height={size}
        >
            <path fill={licenseColor} d={path}></path>
        </svg>
    </>
}
