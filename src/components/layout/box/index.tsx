import React from 'react'
import { css, CSSInterpolation, cx } from '@emotion/css'
import { expandCSS } from '../../../utils/theme'
import { omit } from '../../../utils'
import themingProps from '../../../constants/themingProps'

export declare type ShortDimensions = 'm' | 'p'
export declare type ShortDirections = 't' | 'b' | 'l' | 'r' | 'x' | 'y'
export declare type DimensionDirection = Record<
  ShortDimensions | `${ShortDimensions}${ShortDirections}`,
  string | number
>
export declare interface ThemeBoxProps extends Partial<DimensionDirection> {
  gap?: string | number
  gapX?: string | number
  gapY?: string | number
  d?: React.CSSProperties['display']
  w?: React.CSSProperties['width']
  h?: React.CSSProperties['height']
}

declare type BoxProps = ThemeBoxProps & React.HTMLAttributes<HTMLDivElement>

const Box: React.FC<BoxProps> = props => {
  const { children, className, ...rest } = props

  const styles: CSSInterpolation = expandCSS(rest)

  const cssStyles = css`
    ${styles}
  `

  return (
    <div className={cx(cssStyles, className)} {...omit(rest, themingProps.box)}>
      {children}
    </div>
  )
}

export default Box
