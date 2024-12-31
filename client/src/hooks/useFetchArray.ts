import useFetchArrayState from "./useFetchArrayState.ts";

export default function useFetchArray<Type = Record<string, unknown>>(endpoint: string, dataFunc: (obj: Type) => Type = obj => obj): [Type[], boolean] {

    return useFetchArrayState<Type>(0, endpoint, dataFunc)
}
