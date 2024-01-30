import GetPosition from "../functions/strings/CharPosition.ts";

export default function CurrentUrl() {

    const href = window.location.href
    const url = href.substring(0, GetPosition(href, "/", 3))

    if (['http://127.0.0.1:5173', 'http://localhost:5173'].includes(url)) {
        return 'http://127.0.0.1:8080'
    }

    return url
}
