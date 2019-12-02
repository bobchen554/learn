import { isObject } from './utils'

export type InterceptorFulfilled<T> = (input: T) => T | Promise<T>
export type InterceptorRejected<T> = (input: T) => T | Promise<T>

export interface Interceptor<T, P> {
  fulfilled?: InterceptorFulfilled<T>
  rejected?: InterceptorRejected<P>
}

export default class InterceptorManager<T, P> {
  interceptors: Interceptor<T, P>[] = []

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(interceptor: Interceptor<T, P>): number
  use(fulfilled, rejected): number

  use(): number {
    if (isObject(arguments[0])) {
      this.interceptors.push(arguments[0])
    } else {
      this.interceptors.push({
        fulfilled: arguments[0],
        rejected: arguments[1],
      })
    }
    return this.interceptors.length - 1
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  forEach(fn) {
    this.interceptors
      .filter(i => i)
      .forEach(interceptor => fn(interceptor))
  }
}
