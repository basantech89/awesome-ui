import { BrandColor, CommonElementSize } from '../types'
import { SpacingFn } from '../shared/theme/themeEngine/createSpacing'
import theme from '../shared/theme'
import { brandColors } from '../constants/theme'
import { PaletteColor } from '../shared/theme/themeEngine/palette.types'
import { CSSColor } from '../shared/theme/theme.types'
import isPropValid from '@emotion/is-prop-valid'
import { Sizing } from '../shared/theme/themeEngine/componentConfig'

export declare interface SpacingSizing extends Sizing {}

/**
 * converts spacer to spacing as per provided or default spacing options to theme e.g - 4 spacer = 1 rem = 16px
 * @param spacer - convert to spacing if number, else convert to respective size check if a common element size string i.e xs/sm/md/lg, returns it otherwise
 * @param sizing - optional parameter to provide common element size mapping
 * @param compute - optional compute function to convert number spacer to spacing size
 */
export const getSpacing = (
  spacer: string | number,
  sizing?: SpacingSizing,
  compute?: SpacingFn
): string => {
  compute = compute ?? theme.spacing.compute

  if (typeof spacer === 'number') {
    return compute(spacer)
  } else if (!!sizing && spacer in sizing) {
    const spacing = sizing[spacer as CommonElementSize]
    if (typeof spacing === 'number') {
      return compute(spacing)
    }
    return spacing
  }
  return spacer
}

/* extract spacing amount and unit from spacer
convert input to spacing if it's a number
e.g getSpacingComponents(1.5rem): { amount: 1.5, unit: rem }
* */
export const getSpacingComponents = (spacer: string | number): { spacer: number; unit: string } => {
  let amount = ''
  let unit = ''

  const spacing = getSpacing(spacer)

  for (const char of spacing) {
    if (char === '.' || (!Number.isNaN(Number(char)) && typeof Number(char) === 'number')) {
      amount += char
    } else {
      unit += char
    }
  }

  return { spacer: Number(amount), unit }
}

export const isStyleProp = (prop: string) => prop === 'color' || !isPropValid(prop)
export const isHtmlProp = isPropValid

/* get color value or color object from Brand Color * */
export function getColor(color: BrandColor): PaletteColor
export function getColor(color: BrandColor | CSSColor, intensity: keyof PaletteColor): CSSColor
export function getColor(color: CSSColor): CSSColor
export function getColor(color: BrandColor | CSSColor, intensity?: keyof PaletteColor) {
  if (brandColors.includes(color as BrandColor)) {
    if (intensity) {
      return theme.palette[color as BrandColor][intensity]
    } else {
      return theme.palette[color as BrandColor]
    }
  } else {
    return color
  }
}

export { getContrast as contrast, transparentize, darken, saturate } from 'polished'
