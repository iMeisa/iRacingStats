export default function LicenseLevelGrade(level: number) {

    if (level >= 16) { // Class A
        return 'A'
    }
    else if (level >= 12) { // Class B
        return 'B'
    }
    else if (level >= 8) { // Class C
        return 'C'
    }
    else if (level >= 4) { // Class D
        return 'D'
    }

    return 'R'
}
