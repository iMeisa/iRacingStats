export default function UnixToDate(unix: number): string {
    return new Date( unix as number * 1000 ).toLocaleString()
}
