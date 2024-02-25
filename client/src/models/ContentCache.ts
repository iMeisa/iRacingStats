export type ContentCacheModel = {
    content_name: string,
    data: string,
    hash: string,
}

export const DefaultContentCacheModel: ContentCacheModel = {
    content_name: '',
    data: '',
    hash: '',
}

export const DefaultContentCacheModelString = JSON.stringify(DefaultContentCacheModel)
