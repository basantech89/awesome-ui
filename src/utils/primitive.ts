import { isFaulty, isFunction } from './assertion'

export const upperCaseFirstLetter = (text: string) => `${text[0].toUpperCase()}${text.substring(1)}`

export function filterFaulty(items: any[]): any[]
export function filterFaulty(
  items: Record<string | number | symbol, any>
): Record<string | number | symbol, any>
export function filterFaulty(items: any[] | Record<string | number | symbol, any>) {
  if (items instanceof Array) {
    return items.filter(item => !isFaulty(item))
  }

  return Object.keys(items).reduce((filtered: Record<string | number | symbol, any>, key) => {
    if (!isFaulty(items[key])) {
      filtered[key] = items[key]
    }
    return filtered
  }, {})
}

export const valueOrFn = <V, A>(valueOrFn: V | ((...fnArgs: A[]) => V), ...args: A[]) =>
  isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
