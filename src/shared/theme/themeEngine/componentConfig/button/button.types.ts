import { CSSInterpolation } from '@emotion/css'
import React from 'react'

import { ThemeButtonProps, ButtonVariant } from '../../../../../components/form'
import { CommonElementSize } from '../../../../../types'
import { DeepPartialRequired, DeepRequired } from '../../../../../utils/utils.types'
import { ComponentConfig } from '../componentConfig.types'

type SizeConfig = {
  px: string
  py: string
  fontSize: string
  borderRadius: string
}

export type SizingOption = {
  rounded?: Record<CommonElementSize, SizeConfig>
  square?: Record<CommonElementSize, SizeConfig>
}

export declare interface ButtonThemeOptions {
  default?: ThemeButtonProps
  sizing?: SizingOption
  variant?: Partial<Record<ButtonVariant, React.CSSProperties>>
  base?: CSSInterpolation
}

export declare interface DefaultButtonThemeOptions {
  default: DeepPartialRequired<ThemeButtonProps, 'spinner' | 'icon'>
  base: CSSInterpolation
  variant: Partial<Record<ButtonVariant, React.CSSProperties>>
  sizing: DeepRequired<SizingOption>
}

export type ComponentOptions = DeepPartialRequired<ThemeButtonProps, 'spinner' | 'icon'> & {
  spinnerColor: React.CSSProperties['color']
  spinnerSize: string
}

export declare type ButtonConfig = ComponentConfig<ThemeButtonProps, ComponentOptions>

export declare type GenerateButtonConfig = (buttonThemeOptions?: ButtonThemeOptions) => ButtonConfig
