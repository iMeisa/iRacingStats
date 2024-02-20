export default function SortById
    (obj: Record<string, unknown>[], idName: string): Record<any, Record<string, unknown>> {

    let sortedObject: Record<number, Record<string, unknown>> = {}
    for (const objElement of obj) {
        if (!objElement.hasOwnProperty(idName)) continue

        const id = objElement[idName] as number
        sortedObject[id] = objElement
    }

    return sortedObject
}
