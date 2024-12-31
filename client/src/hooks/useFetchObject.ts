import useFetchObjectState from "./useFetchObjectState.ts";

export default function useFetchObject<Type = Record<string, unknown>>(typeDefault: Type, endpoint: string, dataFormat: (obj: Type) => Type = obj => obj): [Type, boolean] {

    return useFetchObjectState<Type>(0, typeDefault, endpoint, dataFormat)
}
