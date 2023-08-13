export const isFaulty = <V extends null | undefined | typeof Number.isNaN>(
  value: any
): value is V =>
  typeof value === 'undefined' || value === null || Number.isNaN(value)

export const isFunction = (value: unknown): value is (...args: any[]) => any =>
  typeof value === 'function'

export const isObject = (obj: any): obj is object => {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const prototype = Object.getPrototypeOf(obj)
      return prototype === Object.prototype || prototype === null
    }

    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  return false
}
