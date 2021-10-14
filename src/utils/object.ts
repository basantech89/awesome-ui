const isObject = (obj: any) => {
  if (typeof obj === 'object' && obj !== null) {
    if (typeof Object.getPrototypeOf === 'function') {
      const prototype = Object.getPrototypeOf(obj)
      return prototype === Object.prototype || prototype === null
    }

    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  return false
}

type TUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never

export const deepMerge = <T extends Record<string, any>[]>(
  ...objects: T
): TUnionToIntersection<T[number]> =>
  objects.reduce((result, current) => {
    Object.keys(current).forEach(key => {
      if (Array.isArray(result[key]) && Array.isArray(current[key])) {
        result[key] = Array.from(new Set(result[key].concat(current[key])))
      } else if (isObject(result[key]) && isObject(current[key])) {
        result[key] = deepMerge(result[key], current[key])
      } else {
        result[key] = current[key]
      }
    })

    return result
  }, {}) as any

// export const deepMerge: DeepMerge = <
//   T extends Record<string, unknown>,
//   S extends Record<string, unknown>
// >(
//   target: T,
//   ...sources: S[]
// ) => {
//   if (!sources.length) {
//     return target
//   }
//
//   if (isObject(target)) {
//     // making sure to not change target (immutable)
//     const output = { ...target }
//     sources.forEach(source => {
//       if (isObject(source)) {
//         Object.keys(source).forEach(key => {
//           if (isObject(source[key])) {
//             if (!output[key]) {
//               output[key] = { ...(source[key] as Object) }
//             } else {
//               output[key] = deepMerge(output[key], source[key])
//             }
//           } else if (!isFaulty(source[key])) {
//             output[key] = source[key]
//           }
//         })
//       }
//     })
//     return output
//   }
// }

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

export { default as omit } from 'lodash/omit'
export { default as pick } from 'lodash/pick'
