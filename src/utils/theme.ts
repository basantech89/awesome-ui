import { Sizing } from '../shared/theme/themeEngine/componentConfig/componentConfig.types'
import { CommonElementSize } from '../types'
import { SpacingFn } from '../shared/theme/themeEngine/createSpacing'
import theme from '../shared/theme'
import { CSSObject } from '@emotion/css'
import { ShortDimensions, ShortDirections, ThemeBoxProps } from '../components/layout/box'
import { cssDimensions, cssPropMap, directions } from '../constants/theme'
import { deepMerge, get } from './object'
import { upperCaseFirstLetter } from './primitive'

declare interface SpacingSizing extends Sizing {}

/* converts spacer to spacing as per provided or default spacing options to theme
e.g - 4 spacer = 1 rem = 16px
* */
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

/* extract spacer(spacing amount) and unit from spacing
e.g getSpacingComponents(1.5rem): { amount: 1.5, unit: rem }
* */
export const getSpacingComponents = (spacing: string): { spacer: number; unit: string } => {
  let amount = ''
  let unit = ''

  for (const char of spacing) {
    if (char === '.' || (!Number.isNaN(Number(char)) && typeof Number(char) === 'number')) {
      amount += char
    } else {
      unit += char
    }
  }

  return { spacer: Number(amount), unit }
}

declare type CSSDirection = 'top' | 'bottom' | 'left' | 'right'

const getSpacingStyles = (
  prop: 'margin' | 'padding',
  spacing: string,
  ...directions: CSSDirection[]
): CSSObject => {
  const gaps = directions.reduce((styles, dir) => {
    styles[`${prop}${upperCaseFirstLetter(dir)}`] = `-${spacing}`
    return styles
  }, {} as CSSObject)

  gaps['> *'] = directions.reduce((styles, dir) => {
    styles[`${prop}${upperCaseFirstLetter(dir)}`] = spacing
    return styles
  }, {} as CSSObject)

  return gaps
}

export const applyParentChildSpacing = (
  spacing: string,
  dimension: ShortDimensions,
  direction?: ShortDirections
): CSSObject => {
  const { spacer, unit } = getSpacingComponents(spacing)
  const halfSpacing = `${spacer / 2}${unit}`
  const cssDimension = cssDimensions[dimension]
  const cssDirections = directions[direction ?? 'z']
  return getSpacingStyles(cssDimension, halfSpacing, ...cssDirections)
}

export const expandCSS = ({ d, gap, gapX, gapY, ...rest }: ThemeBoxProps) => {
  let styles: CSSObject = {}
  if (d) {
    styles = { ...styles, display: d }
    if (d === 'flex' || d === 'inline-flex') {
      if (gap) {
        styles = { ...styles, ...applyParentChildSpacing(getSpacing(gap), 'm') }
      } else {
        if (gapX) {
          styles = { ...styles, ...applyParentChildSpacing(getSpacing(gapX), 'm', 'x') }
        }
        if (gapY) {
          styles = deepMerge(styles, applyParentChildSpacing(getSpacing(gapY), 'm', 'y'))
        }
      }
    } else if (d === 'grid' || d === 'inline-grid') {
      if (gap) {
        styles = { ...styles, gap: getSpacing(gap) }
      } else {
        if (gapX) {
          styles = { ...styles, columnGap: getSpacing(gapX) }
        }
        if (gapY) {
          styles = { ...styles, rowGap: getSpacing(gapY) }
        }
      }
    }
  }

  const otherStyles = Object.entries(rest).reduce((styles, [cssProp, cssValue]) => {
    if (cssProp[0] === 'm' || cssProp[0] === 'p') {
      return {
        ...styles,
        ...applyParentChildSpacing(
          cssValue,
          cssProp.charAt(0) as ShortDimensions,
          cssProp.charAt(1) as ShortDirections
        )
      }
    }

    if (cssProp in cssPropMap) {
      return {
        ...styles,
        [cssPropMap[cssProp as keyof typeof cssPropMap]]:
          typeof cssValue === 'number' ? getSpacing(cssValue) : cssValue
      }
    }

    return styles
  }, {} as CSSObject)

  return { ...styles, ...otherStyles }
}

export { getContrast as contrast } from 'polished'
export { transparentize } from 'polished'
