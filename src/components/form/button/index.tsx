import { css, cx } from '@emotion/css'
import React from 'react'

import Spinner from '../../feedback/spinner'
import { omit } from '../../../utils'
import themingProps from '../../../constants/themingProps'
import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'
import { Color } from '../../../shared/theme/engine/colors'
import {
  ElementPlacement,
  ElementSize
} from '../../../shared/theme/theme.types'

export declare type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'

export interface ThemeButtonProps {
  color?: Color
  icon?: React.ReactElement
  iconPlacement?: ElementPlacement
  iconSpacing?: string
  loading?: boolean
  loadingText?: string
  rounded?: boolean
  size?: ElementSize
  spinner?: React.ReactNode
  spinnerPlacement?: ElementPlacement
  spinnerSpacing?: string
  variant?: ButtonVariant
}

export type ButtonProps = ThemeButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>

declare interface ButtonIconProps {
  spacing: string
  placement: ElementPlacement
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  children,
  spacing,
  placement
}) => {
  const className = css`
    ${placement === 'left'
      ? `margin-right: ${spacing}`
      : `margin-left: ${spacing}`}
  `

  return React.isValidElement(children)
    ? React.cloneElement<React.SVGAttributes<Record<string, never>>>(children, {
        'aria-hidden': true,
        focusable: false,
        className: cx(className)
      })
    : null
}

const AwesomeButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps
> = (props, ref) => {
  const { children, className, ...otherProps } = props
  const { componentOptions, styles } = useAwesomeStyles<ButtonProps, 'button'>(
    otherProps,
    'button'
  )

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
      type="button"
      className={cx(...styles.main, className)}
      {...omit(rest, themingProps.button)}
    >
      {!loading && icon && iconPlacement === 'left' && (
        <ButtonIcon spacing={iconSpacing} placement={iconPlacement}>
          {icon}
        </ButtonIcon>
      )}

      {(loading && spinnerPlacement === 'left' && spinner) ?? (
        <Spinner
          className={cx(spinnerClassName)}
          color={spinnerColor}
          size={spinnerSize}
        />
      )}

      {loading && loadingText ? loadingText : children}

      {(loading && spinnerPlacement === 'right' && spinner) ?? (
        <Spinner
          className={cx(spinnerClassName)}
          color={spinnerColor}
          size={spinnerSize}
        />
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
