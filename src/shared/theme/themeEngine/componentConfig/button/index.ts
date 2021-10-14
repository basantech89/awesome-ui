import { css } from '@emotion/css'

import { deepMerge, get } from '../../../../../utils'
import { DefaultButtonThemeOptions, GenerateButtonConfig, SizingOption } from './button.types'
import { Spacing } from '../../createSpacing'
import { transparentize } from '../../../../../utils/theme'

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
    minWidth: 80,
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'all 150ms ease-out 0s',
    transform: 'translate3d(0, 0, 0)',
    outline: 'none',
    '&:hover': {
      transform: 'translate3d(0, -2px, 0)'
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
  sizing: {
    rounded: {
      xs: {
        px: spacing[2.5],
        py: spacing[1.5],
        fontSize: '12px',
        borderRadius: '3rem'
      },
      sm: {
        px: spacing[3],
        py: spacing[2],
        fontSize: '14px',
        borderRadius: '3rem'
      },
      md: {
        px: spacing[4],
        py: spacing[2.5],
        fontSize: '16px',
        borderRadius: '3rem'
      },
      lg: {
        px: spacing[5],
        py: spacing.compute(2.8),
        fontSize: '18px',
        borderRadius: '3rem'
      }
    },
    square: {
      xs: {
        px: spacing[2],
        py: spacing[1.5],
        fontSize: '12px',
        borderRadius: '0.375rem'
      },
      sm: {
        px: spacing[3],
        py: spacing.compute(2.25),
        fontSize: '14px',
        borderRadius: '0.375rem'
      },
      md: {
        px: spacing[4],
        py: spacing[3],
        fontSize: '16px',
        borderRadius: '0.375rem'
      },
      lg: {
        px: spacing[6],
        py: spacing.compute(3),
        fontSize: '18px',
        borderRadius: '0.375rem'
      }
    }
  }
})

const generateButtonConfig: GenerateButtonConfig =
  (buttonThemeOptions = {}) =>
  (componentProps, theme) => {
    const defaultButtonThemeOptions = getDefaultButtonThemeOptions(theme.spacing)
    const themeOptions = deepMerge(defaultButtonThemeOptions, buttonThemeOptions)
    const assignedProps = deepMerge(themeOptions.default, componentProps)
    const { size, rounded, color, variant } = assignedProps

    const shape: keyof SizingOption = rounded ? 'rounded' : 'square'
    const sizingOptions = get(themeOptions.sizing, `${shape}.${size}`)

    const sizing = css`
      padding: ${sizingOptions.py} ${sizingOptions.px};
      font-size: ${sizingOptions.fontSize};
      border-radius: ${sizingOptions.borderRadius};
    `

    const disabled = theme.palette[color][300]
    const main = theme.palette[color][500]
    const hover = theme.palette[color][600]
    const active = theme.palette[color][700]

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
        color: ${theme.palette[color].contrast};
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
        box-shadow: ${themeOptions?.variant?.outline?.boxShadow};
        transform: translate3d(0, -2px, 0);
        &:hover {
          background-color: ${transparentize(0.82, hover)};
        }
        &:active {
          background-color: ${theme.palette[color][100]};
        }
        &:disabled {
          background-color: ${transparentize(0.82, theme.palette[color][50])};
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
      ${themeOptions.base}
    `

    const spinnerColor = theme.palette[color].contrast
    const spinnerSize = sizingOptions.fontSize
    const componentOptions = { ...assignedProps, spinnerColor, spinnerSize }

    return {
      styles: [sizing, appearance, base],
      componentOptions
    }
  }

export default generateButtonConfig
