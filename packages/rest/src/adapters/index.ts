import { HttpMethod, HeaderObject } from '../types'
import { HttpResponse } from '../dispatchRequest'

export interface HttpRequestConfig {
  url: string
  method: HttpMethod
  headers?: HeaderObject
  data?: any // payload
}

export type Adapter = (config: HttpRequestConfig) => Promise<HttpResponse>
