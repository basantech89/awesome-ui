import { css, keyframes } from '@emotion/css'

import { brandColors } from '../../../../constants/theme'
import { BrandColor } from '../../../../types'
import { getSpacing } from '../../../../utils/theme'
import { ComponentConfig, ComponentConfigParams, Sizing } from './index'
import { ThemeSpinnerProps } from '../../../../components/feedback/spinner'
import React from 'react'

export declare interface SpinnerThemeOptions {
  default?: ThemeSpinnerProps
  sizing?: Sizing
  base?: Partial<React.CSSProperties>
}

export const defaultSpinnerThemeOptions: Required<SpinnerThemeOptions> = {
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

const generateSpinnerConfig = ({
  props,
  options,
  palette
}: ComponentConfigParams<'spinner'>): ComponentConfig<'spinner'> => {
  const { size, color, speed, thickness } = props
  const spinnerSize = getSpacing(size, options.sizing)

  const sizing = css`
    width: ${spinnerSize};
    height: ${spinnerSize};
  `

  const appearance = css`
    border: ${thickness} solid
      ${brandColors.includes(color as BrandColor) ? palette[color as BrandColor][500] : color};
    animation: ${spin} ${speed} linear infinite;
  `

  const base = css({ ...options.base, label: 'spinner' })

  return {
    styles: { main: [sizing, appearance, base] },
    componentOptions: props
  }
}

export default generateSpinnerConfig
