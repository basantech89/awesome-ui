import { css } from '@emotion/css'

import { SizingOption } from './button.types'
import { DeepRequired, get } from '../../../../../utils'
import { commonBoxSizing, cssBoxSizing } from '../common'
import { ComponentConfigGenerator, DefaultThemeOptions } from '../index'
import { ButtonVariant, ThemeButtonProps } from '../../../../../components/form'
import { ShapeSizing, XStyles } from '../../../theme.types'
import { AwesomeTheme } from '../../../index'

export const getDefaultButtonThemeOptions = (
  theme: Omit<AwesomeTheme, 'components'>
): DefaultThemeOptions<
  DeepRequired<Omit<ThemeButtonProps, 'icon' | 'spinner'>> &
    Pick<ThemeButtonProps, 'icon' | 'spinner'>,
  {
    sizing: ShapeSizing
    variant: Partial<Record<ButtonVariant, XStyles>>
  }
> => ({
  default: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    rounded: true,
    loading: false,
    loadingText: 'Loading',
    spinnerPlacement: 'left',
    spinnerSpacing: '10px',
    iconPlacement: 'left',
    iconSpacing: '10px'
  },
  xStyles: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    textDecoration: 'none',
    fontWeight: 500,
    opacity: 1,
    lineHeight: 1,
    minWidth: '32px',
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'all 150ms ease-out 0s',
    transform: 'translate3d(0, 0, 0)',
    outline: 'none',
    ':active': {
      transform: 'translate3d(0, 2px, 0)'
    },
    ':disabled': {
      transform: 'none',
      cursor: 'not-allowed'
    }
  },
  variant: {
    outline: {
      boxShadow: 'rgba(0, 0, 0, 0.15) 0 0 0 1px inset'
    }
  },
  sizing: commonBoxSizing(theme.spacing)
})

const generateButtonConfig: ComponentConfigGenerator['button'] = (
  props,
  options,
  theme
) => {
  const { size, rounded, color, variant } = props
  const { palette } = theme
  const shape: keyof SizingOption = rounded ? 'rounded' : 'square'
  const sizingOptions = get(options.sizing, shape)
  const sizing = cssBoxSizing(sizingOptions, size)

  const disabled = palette.getColor(color, 300)
  const main = palette.getColor(color, 500)
  const hover = palette.getColor(color, 600)
  const active = palette.getColor(color, 700)

  const baseAppearance = css`
    appearance: none;
  `

  // variant = link
  let appearance = css`
    border: none;
    background-color: transparent;
    color: ${main};
    box-shadow: none;
    &:hover {
      text-decoration: underline;
    }
    &:active {
      color: ${active};
    }
    &:disabled {
      color: ${disabled};
    }
  `

  if (variant === 'solid') {
    appearance = css`
      border: none;
      background-color: ${main};
      color: ${palette[color].contrast};
      transform: translate3d(0, -2px, 0);
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
      &:hover {
        background-color: ${hover};
      }
      &:active {
        background-color: ${active};
      }
      &:disabled {
        background-color: ${disabled};
      }
    `
  }

  if (variant === 'outline') {
    appearance = css`
      background-color: transparent;
      color: ${main};
      border: 1px solid ${transparentize(0.22, main)};
      box-shadow: ${options?.variant?.outline?.boxShadow};
      transform: translate3d(0, -2px, 0);
      &:hover {
        background-color: ${transparentize(0.82, hover)};
      }
      &:active {
        background-color: ${palette[color][100]};
      }
      &:disabled {
        background-color: ${transparentize(0.82, palette[color][50])};
      }
    `
  }

  if (variant === 'ghost') {
    appearance = css`
      border: none;
      background-color: transparent;
      color: ${main};
      transform: translate3d(0, -2px, 0);
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
      &:hover {
        background-color: ${transparentize(0.62, hover)};
      }
      &:active {
        background-color: ${transparentize(0.52, hover)};
      }
      &:disabled {
        background-color: ${transparentize(0.85, hover)};
      }
    `
  }

  const base = css`
    ${options.base}
    label: button
  `

  const spinnerColor = palette[color].contrast
  const spinnerSize = get(sizingOptions, `${size}.fontSize`)
  const componentOptions = { ...props, spinnerColor, spinnerSize }

  return {
    ...props,
    xStyles: options?.xStyles || {}
  }
}

export default generateButtonConfig
