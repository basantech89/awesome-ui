import { Spacing } from '../spacing'
import { css } from '@emotion/css'
import { SizingOption } from './button/button.types'
import { ElementShape, ElementSize, ShapeSizing } from '../../theme.types'
import React from 'react'
import { DeepRequired } from '../../../../utils'

export interface BoxSizeConfig {
  px: string
  py: string
  fontSize: string
  borderRadius: string
}

export interface FlexSizeConfig {
  height: React.CSSProperties['height'] | number
  px: React.CSSProperties['padding'] | number
  fontSize: string
}

export declare interface FlexSizing {
  rounded?: Record<ElementSize, FlexSizeConfig>
  square?: Record<ElementSize, FlexSizeConfig>
}

export const commonBoxSizing = (spacing: Spacing): ShapeSizing => ({
  rounded: {
    xs: {
      padding: `${spacing[2.5]} ${spacing[2.5]}`,
      fontSize: '12px',
      borderRadius: '3rem'
    },
    sm: {
      padding: `${spacing[3]} ${spacing[2]}`,
      fontSize: '14px',
      borderRadius: '3rem'
    },
    md: {
      padding: `${spacing[4]} ${spacing[2]}`,
      fontSize: '16px',
      borderRadius: '3rem'
    },
    lg: {
      padding: `${spacing[5]} ${spacing.compute(2.5)}`,
      fontSize: '18px',
      borderRadius: '3rem'
    }
  },
  square: {
    xs: {
      padding: `${spacing[2]} ${spacing[2]}`,
      fontSize: '12px',
      borderRadius: '0.375rem'
    },
    sm: {
      padding: `${spacing[3]} ${spacing.compute(2)}`,
      fontSize: '14px',
      borderRadius: '0.375rem'
    },
    md: {
      padding: `${spacing[4]} ${spacing[2]}`,
      fontSize: '16px',
      borderRadius: '0.375rem'
    },
    lg: {
      padding: `${spacing[5]} ${spacing.compute(2.5)}`,
      fontSize: '18px',
      borderRadius: '0.375rem'
    }
  }
})

export const cssBoxSizing = (
  sizing: Record<ElementSize, BoxSizeConfig>,
  size: ElementSize
) => {
  const sizeConfig = sizing[size]

  return css`
    padding: ${sizeConfig.py} ${sizeConfig.px};
    font-size: ${sizeConfig.fontSize};
    border-radius: ${sizeConfig.borderRadius};
  `
}

export const commonRoundedFlexSizing = (
  spacing: Spacing
): Record<ElementSize, FlexSizeConfig> => ({
  xs: {
    height: '24px',
    fontSize: '16px',
    px: spacing[4]
  },
  sm: {
    height: '28px',
    fontSize: '16px',
    px: spacing[4]
  },
  md: {
    height: '32px',
    fontSize: '16px',
    px: spacing[4]
  },
  lg: {
    height: '36px',
    fontSize: '16px',
    px: spacing[4]
  }
})

export const commonSquareFlexSizing = commonRoundedFlexSizing

export const commonFlexSizing = (
  spacing: Spacing
): DeepRequired<FlexSizing> => ({
  rounded: commonRoundedFlexSizing(spacing),
  square: commonSquareFlexSizing(spacing)
})

export const cssFlexSizing = (
  sizing: Record<ElementSize, FlexSizeConfig>,
  size: ElementSize
) => {
  const { height, px, fontSize } = sizing[size]

  return css`
    display: flex;
    align-items: center;
    height: ${height};
    padding: 0 ${px};
    font-size: ${fontSize};
  `
}

export type SimpleSizingOptions = Record<
  ElementShape,
  Record<ElementSize, React.CSSProperties['height']>
>

export const simpleSizing: SimpleSizingOptions = {
  rounded: {
    xs: '24px',
    sm: '28px',
    md: '32px',
    lg: '36px'
  },
  square: {
    xs: '24px',
    sm: '28px',
    md: '32px',
    lg: '36px'
  }
}
