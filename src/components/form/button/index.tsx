import { css, cx } from '@emotion/css'
import { useTheme } from '@emotion/react'
import React from 'react'

import { BrandColor, CommonElementPlacement, CommonElementSize } from '../../../types'
import Spinner from '../../feedback/spinner'
import { omit } from '../../../utils'
import themingProps from '../../../constants/themingProps'

export declare type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'

export interface ThemeButtonProps {
  size?: CommonElementSize
  color?: BrandColor
  variant?: ButtonVariant
  rounded?: boolean
  loading?: boolean
  loadingText?: string
  icon?: React.ReactElement
  iconPlacement?: CommonElementPlacement
  iconSpacing?: string
  spinner?: React.ReactNode
  spinnerPlacement?: CommonElementPlacement
  spinnerSpacing?: string
}

export type ButtonProps = ThemeButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>

declare interface ButtonIconProps {
  spacing: string
  placement: CommonElementPlacement
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ children, spacing, placement }) => {
  const className = css`
    ${placement === 'left' ? `margin-right: ${spacing}` : `margin-left: ${spacing}`}
  `

  return React.isValidElement(children)
    ? React.cloneElement<React.SVGAttributes<Record<string, never>>>(children, {
        'aria-hidden': true,
        focusable: false,
        className: cx(className)
      })
    : null
}

const AwesomeButton: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props,
  ref
) => {
  const theme = useTheme()
  const { children, className, ...otherProps } = props
  const { componentOptions, styles } = theme.config.button(otherProps, theme)

  const {
    size,
    loading,
    loadingText,
    icon,
    iconPlacement,
    iconSpacing,
    spinner,
    spinnerPlacement,
    spinnerSpacing,
    spinnerColor,
    spinnerSize,
    ...rest
  } = componentOptions

  const spinnerClassName = css`
	    margin-${spinnerPlacement === 'left' ? 'right' : 'left'}: ${spinnerSpacing}
		`

  return (
    <button
      ref={ref}
      type='button'
      className={cx(...styles, className)}
      {...omit(rest, themingProps.button)}
    >
      {!loading && icon && iconPlacement === 'left' && (
        <ButtonIcon spacing={iconSpacing} placement={iconPlacement}>
          {icon}
        </ButtonIcon>
      )}

      {(loading && spinnerPlacement === 'left' && spinner) ?? (
        <Spinner className={cx(spinnerClassName)} color={spinnerColor} size={spinnerSize} />
      )}

      {loading && loadingText ? loadingText : children}

      {(loading && spinnerPlacement === 'right' && spinner) ?? (
        <Spinner className={cx(spinnerClassName)} color={spinnerColor} size={spinnerSize} />
      )}

      {!loading && icon && iconPlacement === 'right' && (
        <ButtonIcon spacing={iconSpacing} placement={iconPlacement}>
          {icon}
        </ButtonIcon>
      )}
    </button>
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(AwesomeButton)

export default Button
