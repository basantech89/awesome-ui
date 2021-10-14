import { cx } from '@emotion/css'
import { useTheme } from '@emotion/react'
import React from 'react'

import themingProps from '../../../constants/themingProps'
import { BrandColor, CommonElementSize } from '../../../types'
import { omit } from '../../../utils'

export interface ThemeSpinnerProps {
  color?: BrandColor | string
  speed?: string
  size?: CommonElementSize | string | number
  thickness?: string
}

export type SpinnerProps = ThemeSpinnerProps & React.HTMLAttributes<HTMLSpanElement>

const Spinner: React.FC<SpinnerProps> = props => {
  const theme = useTheme()

  const { className, ...rest } = props
  const { styles, componentOptions } = theme.config.spinner(rest, theme)

  return (
    <span {...omit(componentOptions, themingProps.spinner)} className={cx(...styles, className)} />
  )
}

export default Spinner
