export default function Percentage(count: number, total: number): string {
    return ((count / total) * 100).toFixed(2) + "%"
}
