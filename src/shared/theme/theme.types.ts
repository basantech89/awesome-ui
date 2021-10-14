import { ButtonConfig, ButtonThemeOptions } from './themeEngine/componentConfig/button/button.types'
import {
  SpinnerConfig,
  SpinnerThemeOptions
} from './themeEngine/componentConfig/spinner/spinner.types'
import { Spacing, SpacingOptions } from './themeEngine/createSpacing'
import { Palette, PaletteOptions } from './themeEngine/palette.types'
import { Typography, TypographyOptions } from './themeEngine/typography.types'

export declare interface ConfigOptions {
  button?: ButtonThemeOptions
  spinner?: SpinnerThemeOptions
}

export declare interface ThemeConfig {
  button: ButtonConfig
  spinner: SpinnerConfig
}

export declare interface AwesomeThemeOption {
  typographyOptions?: TypographyOptions
  paletteOptions?: PaletteOptions
  spacingOptions?: SpacingOptions
  configOptions?: ConfigOptions
}

export declare interface AwesomeTheme {
  typography: Typography
  palette: Palette
  spacing: Spacing
  config: ThemeConfig
}

export declare type CreateTheme = (themeOptions?: AwesomeThemeOption, ...args: any) => AwesomeTheme
