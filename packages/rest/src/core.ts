import { dispatchRequest, HttpResponse, HttpError } from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import { normalizeHeaders, mergeConfig } from './utils/restTool'
import defaultConfig from './defaults'
import { RequestConfig } from './types'

export { HttpResponse, HttpError } from './dispatchRequest'

export class HRest {
    interceptor = {
        request: new InterceptorManager<RequestConfig, HttpError>(),
        response: new InterceptorManager<HttpResponse, HttpError | HttpResponse>(),
    }

    config: RequestConfig

    constructor(config: RequestConfig) {
        this.setConfig(config)
    }

    setConfig(config: RequestConfig = {}) {
        config.headers = normalizeHeaders(config.headers || {})
        this.config = mergeConfig(mergeConfig(defaultConfig, this.config || {}), config)
    }


    request<T = any>(config: RequestConfig) {
        // merge config
        config.headers = normalizeHeaders(config.headers || {})
        const actualConfig = mergeConfig(this.config, config)

        // Hook up interceptors middleware
        const requestChain = []
        const responseChain = []
        let promise: Promise<HttpResponse<T>> =
            Promise.resolve(actualConfig) as Promise<HttpResponse<T>>

        this.interceptor.request.forEach(interceptor => {
            requestChain.push(interceptor.fulfilled, interceptor.rejected)
        })

        this.interceptor.response.forEach(interceptor => {
            responseChain.push(interceptor.fulfilled, interceptor.rejected)
        })

        const chain = [...requestChain, dispatchRequest, undefined, ...responseChain]

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift())
        }

        return promise
    }

    /**
     * alias functions
     */

    get<T = any>(url: string, config?: RequestConfig) {
        return this.request<T>({
            url,
            method: 'GET',
            ...config,
        })
    }

    delete<T = any>(url: string, config?: RequestConfig) {
        return this.request<T>({
            url,
            method: 'DELETE',
            ...config,
        })
    }

    post<T = any>(url: string, data: any, config?: RequestConfig) {
        return this.request<T>({
            url,
            data,
            method: 'POST',
            ...config,
        })
    }

    put<T = any>(url: string, data: any, config?: RequestConfig) {
        return this.request<T>({
            url,
            data,
            method: 'PUT',
            ...config,
        })
    }

    patch<T = any>(url: string, data: any, config?: RequestConfig) {
        return this.request<T>({
            url,
            data,
            method: 'PATCH',
            ...config,
        })
    }
}
