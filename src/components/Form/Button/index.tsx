import { css, cx } from '@emotion/css'
import { useTheme } from '@emotion/react'
import React from 'react'

import { BrandColor, CommonElementPlacement, CommonSize } from '../../../types'
import { omit } from '../../../utils'
import Spinner from '../../Feedback/Spinner'

export declare type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'

declare type GraphicElement = {
  element: React.ReactElement
  placement?: CommonElementPlacement
  spacing?: string
}

export declare interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: CommonSize
  onClick?: () => void
  color?: BrandColor
  variant?: ButtonVariant
  children?: React.ReactNode
  rounded?: boolean
  loading?: boolean
  icon?: GraphicElement
  spinner?: Partial<GraphicElement>
}

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

const Button: React.FC<ButtonProps> = React.forwardRef((props, ref) => {
  const theme = useTheme()

  const { base, sizing, appearance, componentOptions } = theme.componentStyles.button(
    omit(props, ['onClick', 'children']),
    theme
  )

  const { spinnerColor, color, size, rounded, loading, icon, spinner, ...rest } = componentOptions

  const spinnerClassName = css`
		margin-${spinner.placement === 'left' ? 'right' : 'left'}: ${spinner.spacing}
	`

  return (
    <button ref={ref} className={cx(base, sizing, appearance)} {...rest}>
      {!loading && icon && icon.placement === 'left' && (
        <ButtonIcon spacing={icon.spacing} placement={icon.placement}>
          {icon.element}
        </ButtonIcon>
      )}

      {(loading && spinner.placement === 'left' && spinner.element) ?? (
        <Spinner className={cx(spinnerClassName)} color={spinnerColor} size={size} />
      )}

      {props.children}

      {(loading && spinner.placement === 'right' && spinner.element) ?? (
        <Spinner className={cx(spinnerClassName)} color={spinnerColor} size={size} />
      )}

      {!loading && icon && icon.placement === 'right' && (
        <ButtonIcon spacing={icon.spacing} placement={icon.placement}>
          {icon.element}
        </ButtonIcon>
      )}
    </button>
  )
})

export default Button
