import { RequestConfig } from './types'
import isAbsoluteURL from './utils/isAbsoluteURL'
import combineURL from './utils/combineURL'
import serializeURL from './utils/serializeURL'

export interface HttpResponse<T = any> {
    ok: boolean
    data: T
    status: number
    statusText: string
    headers: any
    config: RequestConfig
    usingCache?: boolean
}

export class HttpError<T = any> extends Error {
    __hRestHttpError: boolean // tslint:disable-line
    config: RequestConfig
    code: number
    status: number
    response: HttpResponse<T>

    constructor(message) {
        super(message)
        this.__hRestHttpError = true
    }
}

const cache: { [key: string]: HttpResponse } = Object.create(null)

function createError<T = any>(srcErr: Error | string, config, code, response?: HttpResponse<T>) {
    let error
    if (typeof srcErr === 'string') {
        error = new HttpError(srcErr)
    } else {
        error = srcErr
    }
    error.config = config
    if (response) {
        error.response = response
        error.status = response.status // Legacy: for legacy API usage
    }
    if (code) {
        error.code = code
    }
    return error
}

export async function dispatchRequest(config: RequestConfig) {
    // 组装请求路径
    let url = config.baseURL && !isAbsoluteURL(config.url)
        ? combineURL(config.baseURL, config.url)
        : config.url

    // 序列化 query string
    url = serializeURL(url, config.params || config.query, config.paramsSerializer)

    // TODO: default headers
    const headers = config.headers || {}

    const data = config.transformRequest
        ? config.transformRequest(config.data, headers)
        : config.data


    const cachedResponse = cache[url]
    const allowCache = config.method === 'GET'

    // 存在可用缓存（只有 GET 请求使用缓存）
    if (allowCache && cachedResponse) {
        switch (config.cache) {
            case 'default':
                // 返回缓存内容
                return { ...cachedResponse, usingCache: true }
            case 'clear':
                // 返回缓存内容，并清空缓存
                delete cache[url]
                return { ...cachedResponse, usingCache: true }
            case 'no-cache':
            default:
                // do nothing
                break
        }
    }

    try {
        const response = await config.adapter({
            url,
            headers,
            data,
            method: config.method,
        })

        response.config = config // overwrite response config
        response.data = config.transformResponse
            ? config.transformResponse(response.data, response.headers)
            : response.data

        if (response.ok) {
            if (allowCache && !cache[url]) {
                // 缓存结果（只缓存 GET 请求）
                cache[url] = response
            }
            return response
        } else {
            throw createError(
                `Request failed with status code ${response.status}`,
                config,
                null,
                response,
            )
        }

    } catch (err) {
        if (err.__hRestHttpError) {
            throw err
        } else {
            // Network Error
            throw createError(err.__showOriginalError ? err : 'Network Error', config, null)
        }
    }
}

