import { BrandColor } from '../../../types'

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

declare interface WholeColor extends DefaultColor {
  contrast: string
}

export declare type ColorVariant = Record<BrandColor, WholeColor>

export declare interface Palette extends ColorVariant {
  colors: Colors
  background: Required<Background>
}

export declare interface PaletteOptions {
  colors?: Partial<DeepPartialColors>
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
  colors: Colors
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
