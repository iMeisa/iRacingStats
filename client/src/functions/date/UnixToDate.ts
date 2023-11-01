
export function UnixToDate(unix: number): string {
    return new Date( unix as number * 1000 ).toLocaleDateString()
}

export function UnixToDateTime(unix: number): string {
    return new Date( unix as number * 1000 ).toLocaleString()
}
