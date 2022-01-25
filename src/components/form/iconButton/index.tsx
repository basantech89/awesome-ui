import React from 'react'
import { cx } from '@emotion/css'
import { ThemeColor } from '../../../shared/theme/theme.types'
import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'
import { omit } from '../../../utils'
import themingProps from '../../../constants/themingProps'

export interface ThemeIconButtonProps {
  size?: string | number
  color?: ThemeColor
  rounded?: boolean
}

export declare interface IconButtonProps
  extends ThemeIconButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  icon: React.ReactNode
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className, ...rest }) => {
  const {
    styles: { main }
  } = useAwesomeStyles(rest, 'iconButton')

  return (
    <button className={cx(...main, className)} {...omit(rest, themingProps.iconButton)}>
      {icon}
    </button>
  )
}

export default IconButton
