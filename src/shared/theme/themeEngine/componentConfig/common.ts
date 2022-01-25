import { Spacing } from '../createSpacing'
import { css } from '@emotion/css'
import { DeepRequired } from '../../../../utils/utils.types'
import { SizingOption } from './button/button.types'
import { CommonElementShape, CommonElementSize } from '../../../../types'
import React from 'react'

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
  rounded?: Record<CommonElementSize, FlexSizeConfig>
  square?: Record<CommonElementSize, FlexSizeConfig>
}

export const commonBoxSizing = (spacing: Spacing): DeepRequired<SizingOption> => ({
  rounded: {
    xs: {
      px: spacing[2.5],
      py: spacing[2],
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
      py: spacing[2],
      fontSize: '16px',
      borderRadius: '3rem'
    },
    lg: {
      px: spacing[5],
      py: spacing.compute(2.5),
      fontSize: '18px',
      borderRadius: '3rem'
    }
  },
  square: {
    xs: {
      px: spacing[2],
      py: spacing[2],
      fontSize: '12px',
      borderRadius: '0.375rem'
    },
    sm: {
      px: spacing[3],
      py: spacing.compute(2),
      fontSize: '14px',
      borderRadius: '0.375rem'
    },
    md: {
      px: spacing[4],
      py: spacing[2],
      fontSize: '16px',
      borderRadius: '0.375rem'
    },
    lg: {
      px: spacing[5],
      py: spacing.compute(2.5),
      fontSize: '18px',
      borderRadius: '0.375rem'
    }
  }
})

export const cssBoxSizing = (
  sizing: Record<CommonElementSize, BoxSizeConfig>,
  size: CommonElementSize
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
): Record<CommonElementSize, FlexSizeConfig> => ({
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

export const commonFlexSizing = (spacing: Spacing): DeepRequired<FlexSizing> => ({
  rounded: commonRoundedFlexSizing(spacing),
  square: commonSquareFlexSizing(spacing)
})

export const cssFlexSizing = (
  sizing: Record<CommonElementSize, FlexSizeConfig>,
  size: CommonElementSize
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
  CommonElementShape,
  Record<CommonElementSize, React.CSSProperties['height']>
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
