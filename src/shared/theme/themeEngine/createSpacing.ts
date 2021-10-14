import { deepMerge } from '../../../utils'

declare type SpacingUnit = number

export declare type SpacingFn = (unit: SpacingUnit) => string

const spacers = [
  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52,
  56, 60, 64, 72, 80, 96
] as const

export type Spacer = typeof spacers[number]

export declare interface Spacing extends Record<Spacer, string> {
  compute: SpacingFn
  px: '1px'
}

export declare interface SpacingOptions {
  unit?: string
  spacerPerSpacingUnit?: number
}

const defaultSpacingOptions: Required<SpacingOptions> = {
  unit: 'rem',
  spacerPerSpacingUnit: 0.25
}

// Thanks to Tailwind, using their spacing specs
// https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
export default function createSpacing(spacingOptions: SpacingOptions = {}): Spacing {
  const { unit, spacerPerSpacingUnit } = deepMerge(defaultSpacingOptions, spacingOptions)

  const computeSpacing = (spacer: SpacingUnit) => `${spacer * spacerPerSpacingUnit}${unit}`

  const precomputedSpacing = spacers.reduce((computed, spacer) => {
    computed[spacer] = computeSpacing(spacer)
    return computed
  }, {} as Record<Spacer, string>)

  const getSpacing = (spacer: SpacingUnit) =>
    spacer in spacers ? precomputedSpacing[spacer as Spacer] : computeSpacing(spacer)

  return {
    compute: getSpacing,
    px: '1px',
    ...precomputedSpacing
  }
}
