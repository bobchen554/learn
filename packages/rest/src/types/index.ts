import { Adapter } from '../adapters'
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type CacheOption = 'default' | 'no-cache' | 'clear'
export type HeaderObject = { [key: string]: string }

export type RequestTransformFn = (data: any, headers: HeaderObject) => any
export type ResponseTransformFn = (data: any, headers: HeaderObject) => any

export interface RequestConfig {
    adapter?: Adapter
    baseURL?: string
    url?: string
    method?: HttpMethod
    transformRequest?: RequestTransformFn
    transformResponse?: ResponseTransformFn
    headers?: HeaderObject
    query?: Object
    params?: Object
    paramsSerializer?: (params: any) => string
    data?: any // payload
    timeout?: number
    cache?: CacheOption
    validateStatus?: (status: number) => boolean
}

