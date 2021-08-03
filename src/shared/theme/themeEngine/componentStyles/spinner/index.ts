import { css, keyframes } from '@emotion/css'

import { SpinnerProps } from '../../../../../components/Feedback/Spinner'
import { brandColors, commonSizes } from '../../../../../constants/theme'
import { BrandColor, CommonSize } from '../../../../../types'
import { deepMerge, mergeWith } from '../../../../../utils'
import { DeepRequired } from '../../../../../utils/types'

export const defaultSpinnerOptions = {
  default: {
    color: 'primary',
    speed: '0.5s',
    size: '1.5rem',
    thickness: '2px'
  },
  base: {
    display: 'inline-block',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRadius: '50%'
  },
  sizing: {
    xs: {
      size: '12px'
    },
    sm: {
      size: '14px'
    },
    md: {
      size: '16px'
    },
    lg: {
      size: '18px'
    }
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

const generateSpinnerStyles =
  (spinnerOptions = defaultSpinnerOptions) =>
  (componentProps: SpinnerProps) => {
    const options: DeepRequired<any> = deepMerge(defaultSpinnerOptions, spinnerOptions)
    const assignedProps = deepMerge(options.default, componentProps)
    const { size: spinnerSize, color, speed, thickness } = assignedProps

    const size = commonSizes.includes(spinnerSize as CommonSize)
      ? options.sizing[spinnerSize].size
      : spinnerSize

    const sizing = css`
      width: ${size};
      height: ${size};
    `

    const appearance = ({ theme }) => css`
      border: ${thickness} solid
        ${brandColors.includes(color as BrandColor) ? theme.palette[color].main : color};
      animation: ${spin} ${speed} linear infinite;
    `

    const base = css(options.base)

    return { base, sizing, appearance, componentOptions: assignedProps }
  }

export default generateSpinnerStyles
