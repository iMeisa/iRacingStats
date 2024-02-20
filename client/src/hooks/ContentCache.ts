import {ContentCacheModel, DefaultContentCacheModel, DefaultContentCacheModelString} from "../models/ContentCache.ts";
import useFetchObject from "./useFetchObject.ts";
import {useEffect} from "react";

export default function useContentCache(contentName: string): [Record<string, unknown>[], boolean] {

    const rawCache = localStorage.getItem(contentName)
    console.log('rawCache ', rawCache)

    let cache: ContentCacheModel
    if (rawCache !== null && rawCache !== undefined && rawCache !== 'undefined' && rawCache !== DefaultContentCacheModelString) {
        cache = JSON.parse(rawCache)
        return [cache.data, false]
    }

    return updateCache(contentName)
}

function updateCache(contentName: string): [Record<string, unknown>[], boolean] {
    const [updatedCache, loading] =
        useFetchObject<ContentCacheModel>(DefaultContentCacheModel,
            `/api/content_cache?content_name=${contentName}`)

    useEffect(() => {
        if (loading) return
        
        localStorage.setItem(contentName, JSON.stringify(updatedCache))
    }, [loading]);

    return [updatedCache.data, loading]
}

// verifyHash returns boolean if hash is up-to-date
// function verifyHash(contentName: string, hash: string): boolean {
//     const dbCache: Promise<ContentCacheModel> =
//         fetch(`/api/content_cache?content_type=${contentName}&rows=1`)
//             .then(response => response.json())
//
//     console.log(dbCache)
//     return false
// }
