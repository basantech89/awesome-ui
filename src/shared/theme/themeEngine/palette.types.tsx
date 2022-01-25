import { BrandColor } from '../../../types'
import React from 'react'
import { DeepRequired } from '../../../utils/utils.types'

declare interface MainColor {
  500: string
}

export declare interface Color extends MainColor {
  50?: string
  100?: string
  200?: string
  300?: string
  400?: string
  600?: string
  700?: string
  800?: string
  900?: string
  contrast?: string
}

export declare interface DefaultColor extends MainColor {
  50: string
  100: string
  200: string
  300: string
  400: string
  600: string
  700: string
  800: string
  900: string
}

type ColorNames =
  | 'flamingo'
  | 'fuchsia'
  | 'purple'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'everGreen'
  | 'lime'
  | 'emerald'
  | 'rose'
  | 'peach'
  | 'violet'
  | 'indigo'
  | 'candy'
  | 'mango'
  | 'kesari'
  | 'strawberry'
  | 'warmGray'
  | 'coolGray'
  | 'gray'
  | 'trueGray'
  | 'blueGray'

type PartialColors = 'onyx' | 'slate' | 'dorian' | 'cloud' | 'helper'

declare interface CommonColors {
  common: {
    white: string
    black: string
    transparent: string
  }
}

export type Colors = Record<ColorNames, DefaultColor> &
  Record<PartialColors, MainColor> &
  CommonColors

export type DeepPartialColors = Record<ColorNames, Color> &
  Record<PartialColors, MainColor> &
  CommonColors

export type PaletteOptionColor = {
  light: string
  main: string
  dark: string
  contrast?: string
}

type Background = {
  default?: string
  paper?: string
}

export declare interface TextColors {
  primary?: React.CSSProperties['color']
  secondary?: React.CSSProperties['color']
  disabled?: React.CSSProperties['color']
  icon?: React.CSSProperties['color']
}

export declare interface SupplementColors {
  text?: {
    light?: TextColors
    dark?: TextColors
  }
}

export declare interface PaletteOptions {
  colors?: SupplementColors
  primary?: Color
  secondary?: Color
  tertiary?: Color
  error?: Color
  warning?: Color
  success?: Color
  info?: Color
  background?: Background
  contrastThreshold?: number
}

export declare interface PaletteDefaultOptions {
  colors: DeepRequired<SupplementColors>
  primary: DefaultColor
  secondary: DefaultColor
  tertiary: DefaultColor
  error: DefaultColor
  warning: DefaultColor
  success: DefaultColor
  info: DefaultColor
  background: Required<Background>
  contrastThreshold: number
}

export declare interface PaletteColor extends DefaultColor {
  contrast: string
}

export declare type ColorVariant = Record<BrandColor, PaletteColor>

export declare interface Palette extends ColorVariant {
  background: Required<Background>
  colors: DeepRequired<SupplementColors>
}
