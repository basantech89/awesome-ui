import { ComponentStyleOptions, ComponentStyles } from './componentStyles/components'
import { Spacing, SpacingOptions } from './createSpacing'
import { Palette, PaletteOptions } from './palette'
import { Typography, TypographyOptions } from './typography'

export declare interface AwesomeThemeOption {
  typographyOptions?: TypographyOptions
  paletteOptions?: PaletteOptions
  spacingOptions?: SpacingOptions
  componentStyleOptions?: ComponentStyleOptions
}

export declare interface AwesomeTheme {
  typography: Typography
  palette: Palette
  spacing: Spacing
  componentStyles: ComponentStyles
}

export declare type CreateTheme = (themeOptions?: AwesomeThemeOption, ...args: any) => AwesomeTheme
