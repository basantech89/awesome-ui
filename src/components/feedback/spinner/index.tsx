import React from 'react'

import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'

import { css } from '@compiled/react'

import { Color } from '../../../shared/theme/engine/colors'

export interface ThemeSpinnerProps {
  /**
   * Color of the spinner
   *
   * @type BrandColor|ThemeColor|CSSColor|HTMLColor
   * @default primary
   */
  color?: Color
  /**
   * In how many seconds/milliseconds, the spinner should complete one full cycle
   *
   * @default 0.5s
   */
  speed?: string
  /**
   * Width and height of the spinner
   *
   * @type number|string|xs|sm|md|lg
   * @default sm
   */
  size?: string | number
  /**
   * Border width of the spinner
   *
   * @default 2px
   */
  thickness?: string
}

export type SpinnerProps = ThemeSpinnerProps &
  React.HTMLAttributes<Omit<HTMLSpanElement, 'color'>>

/**
 * Shows loading state as a placeholder
 */
const Spinner: React.FC<SpinnerProps> = props => {
  const { className, ...rest } = props
  const { xStyles, spinnerSize, thickness, speed, borderColor } =
    useAwesomeStyles(rest, 'spinner')

  const styles = css`
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    width: ${spinnerSize};
    height: ${spinnerSize};
    border-top-color: ${borderColor};
    border-right-color: ${borderColor};
    animation: ${`spin ${speed} linear infinite`};
    display: inline-block;
    border-radius: 50%;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-width: ${thickness};
    border-style: solid;
  `

  return <span css={styles} className={className} />
}

export { Spinner }
