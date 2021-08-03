declare type SpacingFn = (unit: number) => string

export declare interface Spacing {
  spacing: SpacingFn
  px: '1px'
  0.5: string
  1: string
  1.5: string
  2: string
  2.5: string
  3: string
  3.5: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  12: string
  14: string
  16: string
  20: string
  24: string
  28: string
  32: string
  36: string
  40: string
  44: string
  48: string
  52: string
  56: string
  60: string
  64: string
  72: string
  80: string
  96: string
}

export declare type SpacingOptions = number

const defaultSpacingOptions: SpacingOptions = 0.25

export default function createSpacing(
  remPerSpacingUnit: SpacingOptions = defaultSpacingOptions
): Spacing {
  const computeSpacing = spacingUnit => `${spacingUnit * remPerSpacingUnit}rem`

  const spacing = spacingUnit => computeSpacing(spacingUnit)
  // Thanks to Tailwind, using their spacing specs
  // https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale

  return {
    spacing,
    px: '1px',
    0.5: computeSpacing(0.5),
    1: computeSpacing(1),
    1.5: computeSpacing(1.5),
    2: computeSpacing(2),
    2.5: computeSpacing(2.5),
    3: computeSpacing(3),
    3.5: computeSpacing(3.5),
    4: computeSpacing(4),
    5: computeSpacing(5),
    6: computeSpacing(6),
    7: computeSpacing(7),
    8: computeSpacing(8),
    9: computeSpacing(9),
    10: computeSpacing(10),
    12: computeSpacing(12),
    14: computeSpacing(14),
    16: computeSpacing(16),
    20: computeSpacing(20),
    24: computeSpacing(24),
    28: computeSpacing(28),
    32: computeSpacing(32),
    36: computeSpacing(36),
    40: computeSpacing(40),
    44: computeSpacing(44),
    48: computeSpacing(48),
    52: computeSpacing(52),
    56: computeSpacing(56),
    60: computeSpacing(60),
    64: computeSpacing(64),
    72: computeSpacing(72),
    80: computeSpacing(80),
    96: computeSpacing(96)
  }
}
