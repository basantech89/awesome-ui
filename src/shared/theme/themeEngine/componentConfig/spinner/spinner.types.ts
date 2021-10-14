import React from 'react'

import { ThemeSpinnerProps } from '../../../../../components/feedback/spinner'
import { DeepRequired } from '../../../../../utils/utils.types'
import { ComponentConfig, Sizing } from '../componentConfig.types'

export declare interface SpinnerThemeOptions {
  default?: ThemeSpinnerProps
  sizing?: Sizing
  base?: Partial<React.CSSProperties>
}

export declare type SpinnerConfig = ComponentConfig<
  ThemeSpinnerProps,
  DeepRequired<ThemeSpinnerProps>
>

export declare type GenerateSpinnerConfig = (
  spinnerThemeOptions?: SpinnerThemeOptions
) => SpinnerConfig
