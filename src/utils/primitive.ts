export const isFaulty = (value: unknown): boolean =>
  typeof value === 'undefined' || value === null || Number.isNaN(value)

export const upperCaseFirstLetter = (text: string) => `${text[0].toUpperCase()}${text.substring(1)}`
