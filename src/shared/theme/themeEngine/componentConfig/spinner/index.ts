import { css, keyframes } from '@emotion/css'

import { brandColors } from '../../../../../constants/theme'
import { GenerateSpinnerConfig, SpinnerThemeOptions } from './spinner.types'
import { BrandColor } from '../../../../../types'
import { deepMerge } from '../../../../../utils'
import { DeepPartialRequired } from '../../../../../utils/utils.types'
import { getSpacing } from '../../../../../utils/theme'

export const defaultSpinnerThemeOptions: DeepPartialRequired<SpinnerThemeOptions, 'base'> = {
  default: {
    color: 'primary',
    speed: '0.5s',
    size: 'xs',
    thickness: '2px'
  },
  base: {
    display: 'inline-block',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRadius: '50%'
  },
  sizing: {
    xs: '16px',
    sm: '24px',
    md: '28px',
    lg: '36px'
  }
}

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`

const generateSpinnerStyles: GenerateSpinnerConfig =
  (spinnerThemeOptions = {}) =>
  (componentProps, theme) => {
    const options = deepMerge(defaultSpinnerThemeOptions, spinnerThemeOptions)
    const assignedProps = deepMerge(options.default, componentProps)
    const { size, color, speed, thickness } = assignedProps

    const spinnerSize = getSpacing(size, options.sizing)

    const sizing = css`
      width: ${spinnerSize};
      height: ${spinnerSize};
    `

    const appearance = css`
      border: ${thickness} solid
        ${brandColors.includes(color as BrandColor)
          ? theme.palette[color as BrandColor][500]
          : color};
      animation: ${spin} ${speed} linear infinite;
    `

    const base = css(options.base)

    return {
      styles: [sizing, appearance, base],
      componentOptions: assignedProps
    }
  }

export default generateSpinnerStyles
