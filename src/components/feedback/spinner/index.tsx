import { cx } from '@emotion/css'
import React from 'react'

import themingProps from '../../../constants/themingProps'
import { BrandColor } from '../../../types'
import { omit } from '../../../utils'
import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'

export interface ThemeSpinnerProps {
  color?: BrandColor | string
  speed?: string
  size?: string | number
  thickness?: string
}

export type SpinnerProps = ThemeSpinnerProps & React.HTMLAttributes<HTMLSpanElement>

const Spinner: React.FC<SpinnerProps> = props => {
  const { className, ...rest } = props
  const {
    styles: { main },
    componentOptions
  } = useAwesomeStyles(rest, 'spinner')

  return (
    <span {...omit(componentOptions, themingProps.spinner)} className={cx(...main, className)} />
  )
}

export default Spinner
