export function LicenseColor(level: number, includeBelow: boolean = true): string {

    const offset = includeBelow ? 0 : 1

    if (level >= 16+offset) { // Class A
        return '#032f6f'
    }
    else if (level >= 12+offset) { // Class B
        return '#175509'
    }
    else if (level >= 8+offset) { // Class C
        return '#50410a'
    }
    else if (level >= 4+offset) { // Class D
        return '#692c09'
    }

    return '#5d1214'
}

export function LicenseSecondaryColor(level: number, includeBelow: boolean = true): string {

    const offset = includeBelow ? 0 : 1

    if (level >= 16+offset) { // Class A
        return '#66a8ff'
    }
    else if (level >= 12+offset) { // Class B
        return '#85e066'
    }
    else if (level >= 8+offset) { // Class C
        return '#ffe066'
    }
    else if (level >= 4+offset) { // Class D
        return '#ffa366'
    }

    return '#ed7c76'
}

export function LicenseTertiaryColor(level: number, includeBelow: boolean = true): string {

    const offset = includeBelow ? 0 : 1

    if (level >= 16+offset) { // Class A
        return '#006eff'
    }
    else if (level >= 12+offset) { // Class B
        return '#2fac06'
    }
    else if (level >= 8+offset) { // Class C
        return '#ffcc00'
    }
    else if (level >= 4+offset) { // Class D
        return '#d65806'
    }

    return '#e1251b'
}
