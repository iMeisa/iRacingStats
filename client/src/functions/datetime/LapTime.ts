export default function LapTime(time: number, leadingZero: boolean = true): string {

    const date = new Date(0)
    date.setMilliseconds(time / 10)
    return date.toISOString().substring(leadingZero ? 14 : 15, 23)
}
