import {GridColType} from "@mui/x-data-grid";

export const filterFunctions: Record<GridColType, Record<string, Function>> = {
    string: {
        // s: original string
        // v: filter value
        'contains': function (s: string, v: string): boolean
        { return s.toLowerCase().includes( v.toLowerCase() ) },

        'equals': function (s: string, v: string): boolean
        { return s.toLowerCase() === v.toLowerCase() },

        'starts with': function (s: string, v: string): boolean
        { return s.toLowerCase().startsWith( v.toLowerCase() ) },

        'ends with': function (s: string, v: string): boolean
        { return s.toLowerCase().endsWith( v.toLowerCase() ) },

        'is empty': function (s: string, _?: string): boolean
        { return s === '' },

        'is not empty': function (s: string, _?: string): boolean
        {return s !== '' },

        // 'is any of',
    },
    number: {
        '=': function (n: number, v: number): boolean
        { return n == v },

        '≠': function (n: number, v: number): boolean
        { return n != v },

        '>': function (n: number, v: number): boolean
        { return n > v },

        '>=': function (n: number, v: number): boolean
        { return n >= v },

        '<': function (n: number, v: number): boolean
        { return n < v },

        '<=': function (n: number, v: number): boolean
        { return n <= v },

        'is empty': function (n: number | undefined | null, _?: number): boolean
        { return n === undefined || n === null },

        'is not empty': function (n: number | undefined | null, _?: number): boolean
        { return n !== undefined && n !== null },

        // 'is any of',
    },
    date: {
        'is': function (x: any, v: any): boolean
        { return x === v },
    },
    dateTime: {
        'is': function (x: any, v: any): boolean
        { return x === v },
    },
    boolean: {
        'is': function (x: boolean, v: string): boolean
        { return x == (v.toLowerCase() === 'true') },
    },
    singleSelect: {
        'is': function (x: any, v: any): boolean
        { return x === v },
    },
    actions: {
        'is': function (x: any, v: any): boolean
        { return x === v },
    },
}

export function filterOperators(dataType: string): string[] {

    let operators: string[] = []

    Object.entries(filterFunctions[dataType]).forEach(([key, _value]) => {
        operators.push(key)
    })

    return operators
}
