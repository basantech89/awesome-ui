import { CSSInterpolation } from '@emotion/css'
import React from 'react'

import { ThemeButtonProps, ButtonVariant } from '../../../../../components/form'
import { CommonElementSize } from '../../../../../types'
import { DeepPartialRequired, DeepRequired } from '../../../../../utils/utils.types'
import { BoxSizeConfig } from '../common'

export type SizingOption = {
  rounded?: Record<CommonElementSize, BoxSizeConfig>
  square?: Record<CommonElementSize, BoxSizeConfig>
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

export type ButtonComponentOptions = DeepPartialRequired<ThemeButtonProps, 'spinner' | 'icon'> & {
  spinnerColor: React.CSSProperties['color']
  spinnerSize: string
}
