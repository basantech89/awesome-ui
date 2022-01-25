import { css } from '@emotion/css'

import { DefaultButtonThemeOptions, SizingOption } from './button.types'
import { Spacing } from '../../createSpacing'
import { transparentize } from '../../../../../utils/theme'
import { get } from '../../../../../utils'
import { ComponentConfig, ComponentConfigParams } from '../index'
import { commonBoxSizing, cssBoxSizing } from '../common'

export const getDefaultButtonThemeOptions = (spacing: Spacing): DefaultButtonThemeOptions => ({
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
  base: {
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
    minWidth: 32,
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'all 150ms ease-out 0s',
    transform: 'translate3d(0, 0, 0)',
    outline: 'none',
    '&:active': {
      transform: 'translate3d(0, 2px, 0)'
    },
    '&:disabled': {
      transform: 'none',
      cursor: 'not-allowed'
    }
  },
  variant: {
    solid: {
      boxShadow: ''
    },
    outline: {
      boxShadow: 'rgba(0, 0, 0, 0.15) 0 0 0 1px inset'
    }
  },
  sizing: commonBoxSizing(spacing)
})

const generateButtonConfig = ({
  props,
  options,
  palette
}: ComponentConfigParams<'button'>): ComponentConfig<'button'> => {
  const { size, rounded, color, variant } = props

  const shape: keyof SizingOption = rounded ? 'rounded' : 'square'
  const sizingOptions = get(options.sizing, shape)
  const sizing = cssBoxSizing(sizingOptions, size)

  const disabled = palette[color][300]
  const main = palette[color][500]
  const hover = palette[color][600]
  const active = palette[color][700]

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
    styles: { main: [sizing, baseAppearance, appearance, base] },
    componentOptions
  }
}

export default generateButtonConfig
