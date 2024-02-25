export default function SortById<Type = Record<string, unknown>>
    (obj: Record<string, unknown>[], idName: string): Record<any, Type> {

    let sortedObject: Record<number, Type> = {}
    for (const objElement of obj) {
        if (!objElement.hasOwnProperty(idName)) continue

        const id = objElement[idName] as number
        sortedObject[id] = objElement as Type
    }

    return sortedObject
}
