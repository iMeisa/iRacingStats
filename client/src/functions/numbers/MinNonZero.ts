export default function MinNonZero(...numbers: number[]): number {

    let nonZeroNums = []
    for (const num of numbers) {
        if (num <= 0) continue
        nonZeroNums.push(num)
    }

    return nonZeroNums.length > 0 ? Math.min(...nonZeroNums) : 0
}
