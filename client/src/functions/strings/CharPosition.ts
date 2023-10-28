export default function GetPosition(str: string, subString: string, index: number) {
    return str.split(subString, index).join(subString).length;
}
