import { cx } from '@emotion/css'
import { useTheme } from '@emotion/react'
import React from 'react'

import { BrandColor, CommonSize } from '../../../types'
import { omit } from '../../../utils'

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BrandColor | string
  speed?: CommonSize | string
  size?: string
  thickness?: string
}

const Spinner: React.FC<SpinnerProps> = props => {
  const theme = useTheme()

  const { base, sizing, appearance } = theme.componentStyles.spinner(props)

  return (
    <span
      {...omit(props, ['color', 'size', 'speed', 'thickness', 'className'])}
      className={cx(sizing, appearance({ theme }), base, props.className)}
    />
  )
}

export default Spinner
