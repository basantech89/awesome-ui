import CSS from 'csstype'
import React from 'react'
import { InterpolationFunction, ThemedStyledProps } from 'styled-components'

import { ButtonVariant, CommonSize } from '../../../../../components/Form/Button'
import { BrandColor } from '../../../../../types'
import { AwesomeTheme } from '../../types'

type SizeConfig = {
  px: string
  py: string
  fontSize: string
  borderRadius: string
}

type VariantConfig = {
  boxShadow: React.CSSProperties['boxShadow']
  border: React.CSSProperties['border']
}

declare type SizingOption = {
  rounded?: Record<CommonSize, Partial<SizeConfig>>
  square?: Record<CommonSize, Partial<SizeConfig>>
}

declare type Sizing = {
  padding: React.CSSProperties['padding']
  fontSize: React.CSSProperties['fontSize']
  borderRadius: React.CSSProperties['borderRadius']
}

declare type CommonOptions = {
  fontWeight?: React.CSSProperties['fontWeight']
}

export declare interface ButtonStyleOptions {
  sizing?: SizingOption
  variant?: Partial<Record<ButtonVariant, Partial<VariantConfig>>>
  base?: CommonOptions
}

export declare type Appearance = Record<
  keyof CSS.Pseudos & keyof CSS.Properties,
  InterpolationFunction<ThemedStyledProps<Record<string, never>, AwesomeTheme>>
>

export declare interface ButtonStylesObject {
  appearance: Appearance
  sizing: Sizing
  base: Required<CommonOptions>
}

export declare type ButtonStyles = (
  color: BrandColor,
  variant: ButtonVariant,
  rounded: boolean,
  size: CommonSize
) => ButtonStylesObject
export declare type CreateButtonStyles = (buttonStyleOptions?: ButtonStyleOptions) => ButtonStyles
