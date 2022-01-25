import generateButtonConfig, { getDefaultButtonThemeOptions } from './button'
import { ClassNamesArg } from '@emotion/css'
import { CommonElementSize } from '../../../../types'
import { Theme } from '@emotion/react'
import generateSpinnerConfig, { defaultSpinnerThemeOptions, SpinnerThemeOptions } from './spinner'
import generateInputConfig, { DefaultInputThemeOptions, getDefaultInputThemeOptions } from './input'
import generateAutoCompleteConfig, {
  DefaultAutoCompleteThemeOptions,
  defaultAutoCompleteThemeOptions
} from './autoComplete'
import generateLabelConfig, { DefaultLabelThemeOptions, defaultLabelThemeOptions } from './label'
import generateSelectConfig, {
  defaultSelectThemeOptions,
  DefaultSelectThemeOptions
} from './select'
import { ButtonComponentOptions, DefaultButtonThemeOptions } from './button/button.types'
import { ThemeButtonProps, ThemeInputProps } from '../../../../components/form'
import { ThemeSpinnerProps } from '../../../../components/feedback/spinner'
import { ThemeSelectProps } from '../../../../components/form/select'
import { ThemeLabelProps } from '../../../../components/data/label'
import { ThemeIconButtonProps } from '../../../../components/form/iconButton'
import generateIconButtonConfig, {
  defaultIconButtonThemeOptions,
  ThemeIconButtonOptions
} from './iconButton'
import { DeepRequired } from '../../../../utils/utils.types'
import { ThemeAutoCompleteProps } from '../../../../components/form/autoComplete'

export const defaultComponentConfigOptions = {
  button: getDefaultButtonThemeOptions,
  iconButton: defaultIconButtonThemeOptions,
  spinner: defaultSpinnerThemeOptions,
  input: getDefaultInputThemeOptions,
  label: defaultLabelThemeOptions,
  select: defaultSelectThemeOptions,
  autoComplete: defaultAutoCompleteThemeOptions
} as const

const componentConfigCollection = {
  button: generateButtonConfig,
  iconButton: generateIconButtonConfig,
  spinner: generateSpinnerConfig,
  label: generateLabelConfig,
  input: generateInputConfig,
  select: generateSelectConfig,
  autoComplete: generateAutoCompleteConfig
} as const

export default componentConfigCollection

export declare type DefaultComponentConfigOptions = typeof defaultComponentConfigOptions

declare type ComponentConfigCollection = typeof componentConfigCollection

declare interface ComponentOptions extends Record<keyof DefaultComponentConfigOptions, unknown> {
  button: ButtonComponentOptions
  input: Required<ThemeInputProps>
  spinner: Required<ThemeSpinnerProps>
  select: Required<ThemeSelectProps>
  label: Required<ThemeLabelProps>
  iconButton: Required<ThemeIconButtonProps>
}

export declare interface ComponentConfig<K extends keyof DefaultComponentConfigOptions> {
  styles: {
    main: ClassNamesArg[]
    container?: ClassNamesArg
    label?: ClassNamesArg
  }
  componentOptions: ComponentOptions[K]
}

export declare interface ThemeProps extends Record<keyof DefaultComponentConfigOptions, unknown> {
  button: ThemeButtonProps
  input: ThemeInputProps
  spinner: ThemeSpinnerProps
  select: ThemeSelectProps
  label: ThemeLabelProps
  iconButton: ThemeIconButtonProps
  autoComplete: ThemeAutoCompleteProps
}

declare interface ComponentDefaultOptionsParam
  extends Record<keyof DefaultComponentConfigOptions, unknown> {
  button: DefaultButtonThemeOptions
  input: DefaultInputThemeOptions
  spinner: Required<SpinnerThemeOptions>
  select: DefaultSelectThemeOptions
  label: DefaultLabelThemeOptions
  iconButton: DeepRequired<ThemeIconButtonOptions>
  autoComplete: DefaultAutoCompleteThemeOptions
}

export declare interface ComponentConfigParams<K extends keyof DefaultComponentConfigOptions>
  extends Omit<Theme, 'componentConfigOptions'> {
  props: Required<ThemeProps[K]>
  options: ComponentDefaultOptionsParam[K]
}

export declare type Sizing = Record<CommonElementSize, string | number>
