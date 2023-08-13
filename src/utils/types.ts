export type GetValue<T> = T extends (...args: any[]) => infer R ? R : T
