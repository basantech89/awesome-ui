// overload because generic variadic solution has messy result and all/most mergings are binary
export interface DeepMerge {
  <T extends Record<string, unknown>, S>(target: T, source: S): T & S
  <T extends Record<string, unknown>, S extends Array<any>>(target: T, ...sources: S): T & S[number]
}

// make all properties required
export type DeepRequired<T> = { [P in keyof T]-?: T[P] }
