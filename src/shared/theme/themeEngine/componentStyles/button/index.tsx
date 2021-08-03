import { css } from '@emotion/css'
import { Theme } from '@emotion/react'
import { transparentize } from 'polished'
import React from 'react'

import { ButtonProps } from '../../../../../components/Form/Button'
import { deepMerge, mergeWith } from '../../../../../utils'
import { DeepRequired } from '../../../../../utils/types'
import createSpacing from '../../createSpacing'

const spacing = createSpacing()

export const defaultButtonOptions = {
  default: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    rounded: true,
    loading: false,
    spinner: {
      placement: 'left',
      spacing: '10px'
    },
    icon: {
      placement: 'left',
      spacing: '10px'
    },
    type: 'button'
  },
  base: {
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    fontWeight: 500,
    opacity: 1,
    lineHeight: 1,
    transition: 'all 150ms ease-out',
    transform: 'translate3d(0, 0, 0)',
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    userSelect: 'none'
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
        py: spacing.spacing(2.8),
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
        py: spacing.spacing(2.25),
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
        py: spacing.spacing(3),
        fontSize: '18px',
        borderRadius: '0.375rem'
      }
    }
  }
}

const generateButtonStyles: any =
  (buttonOptions = {}) =>
  (componentProps: ButtonProps, theme: Theme) => {
    const options: DeepRequired<any> = deepMerge(defaultButtonOptions, buttonOptions)
    const assignedProps = deepMerge(options.default, componentProps)
    const { size, rounded, color, variant } = assignedProps

    const shape = rounded ? 'rounded' : 'square'
    const sizingOptions = options.sizing[shape][size]

    const sizing = css`
      padding: ${sizingOptions.py} ${sizingOptions.px};
      font-size: ${sizingOptions.fontSize};
      border-radius: ${sizingOptions.borderRadius};
    `

    const commonAppearance = css`
      transform: translate3d(0, -2px, 0);
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
    `

    // variant = link
    let appearance = css`
      border: none;
      background-color: transparent;
      color: ${theme.palette[color].main};
      transform: translate3d(0, -2px, 0);
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
      &:hover {
        text-decoration: underline;
      }
    `

    if (variant === 'solid') {
      appearance = css`
        border: none;
        background-color: ${theme.palette[color].main};
        color: ${theme.palette[color].contrast};
        transform: translate3d(0, -2px, 0);
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
        &:hover {
          background-color: ${theme.palette[color].dark};
        }
      `
    }

    if (variant === 'outline') {
      appearance = css`
        background-color: transparent;
        color: ${theme.palette[color].main};
        border: 1px solid ${transparentize(0.22, theme.palette[color].main)};
        box-shadow: ${options.variant.outline.boxShadow};
        transform: translate3d(0, -2px, 0);
        &:hover {
          background-color: ${transparentize(0.62, theme.palette[color].light)};
        }
      `
    }

    if (variant === 'ghost') {
      appearance = css`
        border: none;
        background-color: transparent;
        color: ${theme.palette[color].main};
        transform: translate3d(0, -2px, 0);
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 6px 0;
        &:hover {
          background-color: ${transparentize(0.62, theme.palette[color].light)};
        }
      `
    }

    const base = css`
      ${options.base}
    `

    const spinnerColor = theme.palette[color].contrast
    const componentOptions = { ...assignedProps, spinnerColor }

    return {
      sizing,
      appearance,
      base,
      componentOptions
    }
  }

export default generateButtonStyles
