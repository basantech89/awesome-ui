import generateSpinnerConfig, { defaultSpinnerThemeOptions } from './spinner'
import { ThemeSpinnerProps } from '../../../../components/feedback/spinner'
import { DeepRequired } from '../../../../utils'
import { AwesomeTheme } from '../../index'
import { XStyles } from '../../theme.types'
import generateButtonConfig, { getDefaultButtonThemeOptions } from './button'
import { ThemeButtonProps } from '../../../../components/form'
import { HTMLColor, CSSColor } from '../colors'

export interface ThemeProps {
  spinner: DeepRequired<ThemeSpinnerProps>
  button: DeepRequired<ThemeButtonProps>
}

export type DefaultThemeOptions<Props, Extras = {}> = {
  default: Props
  xStyles: XStyles
} & Extras

export const componentOptions = {
  spinner: defaultSpinnerThemeOptions,
  button: getDefaultButtonThemeOptions
}

export type ComponentOptions = typeof componentOptions

export type ComponentConfig<K extends keyof ComponentOptions, Extras = {}> = (
  props: ThemeProps[K],
  options: AwesomeTheme['components'][K],
  theme: AwesomeTheme
) => ThemeProps[K] &
  Extras & {
    xStyles: XStyles
  }

export type ComponentConfigGenerator = {
  spinner: ComponentConfig<
    'spinner',
    {
      spinnerSize: string
      borderColor: CSSColor | HTMLColor
    }
  >
  button: ComponentConfig<'button'>
}

export const componentMethods = {
  spinner: generateSpinnerConfig,
  button: generateButtonConfig
}
