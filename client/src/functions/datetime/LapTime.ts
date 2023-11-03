export default function LapTime(time: number): string {

    const date = new Date(0)
    date.setMilliseconds(time / 10)
    return date.toISOString().substring(14, 23)
}
