import GetPosition from "../functions/strings/CharPosition.ts";

export default function CurrentUrl() {

    const href = window.location.href
    // const path = window.location.pathname
    const url = href.substring(0, GetPosition(href, "/", 3))

    if (url === 'http://127.0.0.1:5173') {
        return 'http://127.0.0.1:8080'
    }

    return url
}
