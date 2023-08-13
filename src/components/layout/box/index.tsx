import React from 'react'
import { css, CSSObject, cx } from '@emotion/css'
import { HTMLProps } from '../../../shared/theme/types'
import { cssDimensions, cssPropMap, directions } from '../../../constants/theme'
import { upperCaseFirstLetter } from '../../../utils/primitive'
import { mapKeys } from '../../../utils'
import {
  getSpacing,
  getSpacingComponents,
  isHtmlProp,
  isStyleProp
} from '../../../utils/theme'

export declare type ShortDimension = 'm' | 'p'
export declare type ShortDirection = 't' | 'b' | 'l' | 'r' | 'x' | 'y'
export declare type DimensionDirection = Record<
  ShortDimension | `${ShortDimension}${ShortDirection}`,
  string | number
>
export declare interface ThemeBoxProps extends Partial<DimensionDirection> {
  gap?: string | number
  gapX?: string | number
  gapY?: string | number
  d?: React.CSSProperties['display']
  w?: React.CSSProperties['width']
  h?: React.CSSProperties['height']
  flexDirection?: React.CSSProperties['flexDirection']
}

export declare interface BoxProps
  extends ThemeBoxProps,
    HTMLProps<HTMLDivElement> {}

declare interface ApplySpacingParams {
  spacing: string
  dimension: ShortDimension
  negativeSpacing?: boolean
  direction?: ShortDirection | 'z'
  spacingFraction?: number
}

declare type CSSDirection = 'top' | 'bottom' | 'left' | 'right'

export const applySpacing = ({
  spacing,
  dimension,
  negativeSpacing = false,
  direction = 'z',
  spacingFraction = 1
}: ApplySpacingParams): CSSObject => {
  const { spacer, unit } = getSpacingComponents(spacing)
  const convertedSpacing = `${spacer / spacingFraction}${unit}`
  const cssDimension = cssDimensions[dimension]
  const cssDirections: Readonly<CSSDirection[]> = directions[direction]
  return cssDirections.reduce((styles, dir) => {
    styles[`${cssDimension}${upperCaseFirstLetter(dir)}`] = negativeSpacing
      ? `-${convertedSpacing}`
      : convertedSpacing
    return styles
  }, {} as CSSObject)
}

declare interface CSSAndAttributes {
  css: CSSObject
  attributes: Record<string, unknown>
}

export const extractCSSAndAttributes = ({
  d,
  gap,
  gapX,
  gapY,
  ...rest
}: ThemeBoxProps): CSSAndAttributes => {
  let layout: CSSObject = {}
  let spacing: CSSObject = {}

  if (d) {
    if (d === 'flex' || d === 'inline-flex') {
      const gaps = mapKeys({ gap, gapX, gapY }, ['z', 'x', 'y'])
      Object.entries(gaps).forEach(([direction, spacer]) => {
        const props = {
          spacing: getSpacing(spacer),
          dimension: 'm' as ShortDimension,
          direction: direction as ShortDirection | 'z',
          spacingFraction: 2
        }
        spacing = {
          ...applySpacing({ ...props, negativeSpacing: true }),
          ['> *']: applySpacing(props)
        }
      })
    } else if (d === 'grid' || d === 'inline-grid') {
      const gapTypes = mapKeys({ gap, gapX, gapY }, [
        'gap',
        'columnGap',
        'rowGap'
      ])
      Object.entries(gapTypes).forEach(([gapType, value]) => {
        spacing = {
          ...spacing,
          [gapType]: getSpacing(value)
        }
      })
    }
    layout = { ...layout, display: d, ...spacing }
  }

  const { css, attributes } = Object.entries(rest).reduce(
    (props: CSSAndAttributes, [prop, spacing]) => {
      if (prop[0] === 'm' || prop[0] === 'p') {
        const spacingProps = {
          spacing,
          dimension: prop.charAt(0) as ShortDimension,
          direction: (prop.charAt(1) || 'z') as ShortDirection
        }
        props.css = {
          ...props.css,
          ...applySpacing(spacingProps)
        }
      } else if (prop in cssPropMap) {
        props.css[cssPropMap[prop as keyof typeof cssPropMap]] =
          typeof spacing === 'number' ? getSpacing(spacing) : spacing
      } else if (isStyleProp(prop)) {
        props.css[prop] =
          typeof spacing === 'number' ? getSpacing(spacing) : spacing
      } else if (isHtmlProp(prop)) {
        props.attributes[prop] = spacing
      }

      return props
    },
    { css: {}, attributes: {} }
  )

  return { css: { ...css, ...layout }, attributes }
}

const Box: React.FC<BoxProps> = props => {
  const { children, className, ...rest } = props

  const { css: styles, attributes } = extractCSSAndAttributes(rest)

  const _css = css`
    ${styles}
  `

  return (
    <div className={cx(_css, className)} {...attributes}>
      {children}
    </div>
  )
}

export default Box
