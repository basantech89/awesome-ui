import { DeepMerge } from './types'

export const isObject = (item: unknown): boolean =>
  item && typeof item === 'object' && !Array.isArray(item)

export const deepMerge: DeepMerge = (target, ...sources) => {
  if (!sources.length) {
    return target
  }
  // making sure to not change target (immutable)
  const output = { ...target }
  sources.forEach(source => {
    if (isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!output[key]) {
            output[key] = { ...source[key] }
          } else {
            output[key] = deepMerge(output[key], source[key])
          }
        } else {
          output[key] = source[key]
        }
      })
    }
  })
  return output
}

type Get = (obj: Record<string, any>, path: string | number, fallback?: any) => any

export const get: Get = (obj, path, fallback) => {
  const keys: Array<string | number> = typeof path === 'string' ? path.split('.') : [path]

  if (!obj) {
    return fallback ?? null
  }

  return keys.reduce((value, key) => value[key] ?? fallback ?? null, obj)
}

export const memoize = (fn: Get): Get => {
  const cache = new WeakMap()

  return (obj, path, fallback) => {
    if (!obj) {
      return fn(obj, path, fallback)
    }

    if (!cache.has(obj)) {
      cache.set(obj, new Map())
    }

    const map = cache.get(obj)

    if (map.has(path)) {
      return map.get(path)
    }

    const value = fn(obj, path, fallback)

    map.set(path, value)

    return value
  }
}

export const memoizedGet = memoize(get)

export { default as mergeWith } from 'lodash/mergeWith'
export { default as omit } from 'lodash/omit'
