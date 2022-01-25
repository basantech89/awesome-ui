import { ButtonThemeOptions } from './themeEngine/componentConfig/button/button.types'
import { SpinnerThemeOptions } from './themeEngine/componentConfig/spinner'
import { Spacing, SpacingOptions } from './themeEngine/createSpacing'
import { Palette, PaletteOptions } from './themeEngine/palette.types'
import { Typography, TypographyOptions } from './themeEngine/typography.types'
import { InputThemeOptions } from './themeEngine/componentConfig/input'
import React from 'react'
import { BrandColor } from '../../types'
import { AutoCompleteThemeOptions } from './themeEngine/componentConfig/autoComplete'

export type CSSColor = NonNullable<React.CSSProperties['color']>
export type ThemeColor = BrandColor | CSSColor

export declare interface ThemeComponentConfigOptions {
  button?: ButtonThemeOptions
  spinner?: SpinnerThemeOptions
  input?: InputThemeOptions
  autoComplete?: AutoCompleteThemeOptions
}

export declare interface AwesomeThemeOption {
  typographyOptions?: TypographyOptions
  paletteOptions?: PaletteOptions
  spacingOptions?: SpacingOptions
  componentConfigOptions?: ThemeComponentConfigOptions
}

export declare interface AwesomeTheme {
  typography: Typography
  palette: Palette
  spacing: Spacing
  componentConfigOptions?: ThemeComponentConfigOptions
}

export declare type CreateTheme = (themeOptions?: AwesomeThemeOption, ...args: any) => AwesomeTheme
