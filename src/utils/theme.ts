import isPropValid from '@emotion/is-prop-valid'
import { SpacingFn } from '../shared/theme/engine/spacing'
import {
  PaletteColor,
  PaletteColors
} from '../shared/theme/engine/palette.types'
import {
  BrandColor,
  brandColors,
  Color,
  colorNames,
  commonColors,
  completeColorNames,
  completeColors,
  DefaultColor,
  HTMLColor,
  partialColors,
  CSSColor,
  ThemeColor
} from '../shared/theme/engine/colors'
import { defaultTheme } from '../shared/theme/provider'
import { ShapeSizing, Sizing } from '../shared/theme/theme.types'
import { getKeys, hasOwn } from './object'
import { includes } from '.'
import { getContrastColor } from './colors'

export declare interface SpacingSizing extends ShapeSizing {}

/**
 * converts spacer to spacing as per the given(or default) spacing options to theme. e.g - 4 spacer = 1 rem = 16px
 * @param spacer - number
 * @param compute - A spacing function that takes spacer as argument and returns string as spacing
   @param sizing - record of spacer and string
 */
export function getSpacing(
  spacer: string | number,
  compute: SpacingFn,
  sizing?: Sizing
): string {
  if (typeof spacer === 'number') {
    return compute(spacer)
  } else if (sizing && hasOwn(sizing, spacer)) {
    return sizing[spacer]
  }

  return spacer
}

/* extract spacing amount and unit from spacer
convert input to spacing if it's a number
e.g. getSpacingComponents(1.5rem): { amount: 1.5, unit: rem }
* */
export const getSpacingComponents = (
  spacer: string | number,
  compute: SpacingFn
): { spacer: number; unit: string } => {
  let amount = ''
  let unit = ''

  const spacing = getSpacing(spacer, compute)

  for (const char of spacing) {
    if (
      char === '.' ||
      (!Number.isNaN(Number(char)) && typeof Number(char) === 'number')
    ) {
      amount += char
    } else {
      unit += char
    }
  }

  return { spacer: Number(amount), unit }
}

export const isStyleProp = (prop: string) =>
  prop === 'color' || !isPropValid(prop)
export const isHtmlProp = isPropValid

export function isBrandColor(color: Color): color is BrandColor {
  return typeof color !== 'object' && includes(brandColors, color)
}

export function isThemeColor(color: Color): color is keyof ThemeColor {
  const allThemeColors = {
    ...completeColors,
    ...commonColors,
    ...partialColors
  }

  return typeof color !== 'object' && Object.hasOwn(allThemeColors, color)
}

export const getCSSColor = (
  color: HTMLColor | CSSColor
): CSSColor | HTMLColor => {
  if (typeof color !== 'object' && includes(getKeys(colorNames), color)) {
    return colorNames[color]
  }

  return color
}

export const getColorFromBrandColor = (
  color: BrandColor,
  paletteColors: PaletteColors,
  intensity?: keyof PaletteColor
) => {
  if (intensity) {
    return paletteColors[color][intensity]
  }

  return paletteColors[color]
}

export const getColorFromThemeColor = (
  color: keyof ThemeColor,
  intensity?: keyof PaletteColor,
  contrastThreshold?: number
) => {
  if (includes(getKeys(completeColors), color)) {
    if (intensity) {
      if (intensity === 'contrast') {
        return getContrastColor(completeColors[color][500], contrastThreshold)
      }

      return completeColors[color][intensity]
    } else {
      return completeColors[color]
    }
  }

  if (includes(getKeys(partialColors), color)) {
    return partialColors[color]['500']
  }

  return commonColors[color]
}

export function getColor(config: {
  color: Color
  paletteColors?: PaletteColors
  intensity: keyof PaletteColor
  contrastThreshold?: number
}): CSSColor | HTMLColor
export function getColor(config: {
  color: Color
  paletteColors?: PaletteColors
  contrastThreshold?: number
}): DefaultColor | PaletteColor
export function getColor(config: {
  color: Color
  paletteColors?: PaletteColors
  intensity?: keyof PaletteColor
  contrastThreshold?: number
}) {
  const { color, paletteColors, intensity, contrastThreshold } = config
  if (isBrandColor(color)) {
    const palette = paletteColors || defaultTheme.palette
    return getColorFromBrandColor(color, palette, intensity)
  }

  if (isThemeColor(color)) {
    return getColorFromThemeColor(color, intensity, contrastThreshold)
  }

  return getCSSColor(color)
}
