import { isObject } from './assertion'

export type Dict = Record<string | number | symbol, any>

export const getKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as (keyof typeof obj)[]

export const hasOwn = <Obj extends object>(
  obj: Obj,
  k: PropertyKey
): k is keyof Obj => Object.hasOwn(obj, k)

type DeepMerge<S extends Dict, D extends Dict> = {
  [K in keyof S]: S[K]
} &
  {
    [K in keyof D as D[K] extends null | undefined
      ? never
      : K]: D[K] extends Dict ? DeepMerge<S[K], D[K]> : D[K]
  }

export const deepMerge = <S extends Dict, D extends Dict>(
  source: S,
  destination: D
) =>
  getKeys(destination).reduce<DeepMerge<S, D>>(
    (merged, key) => {
      const value = destination[key]
      if (isObject(value)) {
        merged[key] = deepMerge(source?.[key], value) as any
      } else if (value) {
        merged[key] = value
      }

      return merged
    },
    { ...source }
  )

type Get = (
  obj: Record<string, any>,
  path: string | number,
  fallback?: any
) => any

export const get: Get = (obj, path, fallback) => {
  const keys: Array<string | number> =
    typeof path === 'string' ? path.split('.') : [path]

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

export const mapKeys = <K extends string | number | symbol, V>(
  obj: Record<string | number | symbol, V>,
  keys: Array<K>
): Record<K, NonNullable<V>> =>
  Object.values(obj).reduce((mappedObj, value, index) => {
    if (value) {
      const key = keys[index]
      // @ts-ignore
      mappedObj[key] = value
    }
    return mappedObj
  }, {} as Record<K, NonNullable<V>>)

export { default as omit } from 'lodash/omit'
export { default as pick } from 'lodash/pick'
