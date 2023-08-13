import { CSSInterpolation } from '@emotion/css'
import React from 'react'

import { ThemeButtonProps, ButtonVariant } from '../../../../../components/form'
import { BoxSizeConfig } from '../common'
import { DeepPartialRequired, DeepRequired } from '../../../../../utils'
import { ElementSize } from '../../../theme.types'

export type SizingOption = {
  rounded?: Record<ElementSize, BoxSizeConfig>
  square?: Record<ElementSize, BoxSizeConfig>
}

export declare interface ButtonThemeOptions {
  default?: ThemeButtonProps
  base?: CSSInterpolation
  sizing?: SizingOption
  variant?: Partial<Record<ButtonVariant, React.CSSProperties>>
}

export declare interface DefaultButtonThemeOptions {
  default: DeepPartialRequired<ThemeButtonProps, 'spinner' | 'icon'>
  base: CSSInterpolation
  variant: Partial<Record<ButtonVariant, React.CSSProperties>>
  sizing: DeepRequired<SizingOption>
}

export type ButtonComponentOptions = DeepPartialRequired<
  ThemeButtonProps,
  'spinner' | 'icon'
> & {
  spinnerColor: React.CSSProperties['color']
  spinnerSize: string
}
