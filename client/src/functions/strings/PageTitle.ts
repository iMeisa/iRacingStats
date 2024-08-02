const siteName = 'irstats.net'

export default function PageTitle(title?: string, overwrite?: boolean) {

    if (overwrite && title) {
        document.title = title
        return
    }

    if (title) {
        document.title = `${title} - ${siteName}`
        return
    }

    document.title = siteName

}
