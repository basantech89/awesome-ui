import React from 'react'
import { cx } from '@emotion/css'
import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'
import { omit } from '../../../utils'
import themingProps from '../../../constants/themingProps'

export declare interface ThemeLabelProps {
  spacing?: React.CSSProperties['paddingRight'] | number
  direction?: 'row' | 'column'
}

export declare interface LabelProps extends ThemeLabelProps {
  label: React.ReactNode | string
  className?: string
  htmlFor?: string
}

const Label: React.FC<LabelProps> = ({ label, className, ...rest }) => {
  const { styles } = useAwesomeStyles(rest, 'label')

  return (
    <label className={cx(styles.main, className)} {...omit(rest, themingProps.label)}>
      {label}
    </label>
  )
}

export default Label
