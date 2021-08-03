import { BrandColor } from '../../../types'

export declare interface Color {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  contrast?: Partial<Color>
}

export type PartialColor = Partial<Color>

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
type CommonColors = {
  common: {
    white: string
    black: string
    transparent: string
  }
}

type Colors = Record<ColorNames, Color> & Record<PartialColors, PartialColor> & CommonColors

export type PaletteOptionColor = {
  light: string
  main: string
  dark: string
}

export declare interface PaletteColor extends PaletteOptionColor {
  contrast: string
}

type Background = {
  default: string
  paper: string
}

export declare type ColorVariant = Record<BrandColor, PaletteColor>

export declare interface Palette extends ColorVariant {
  colors: Partial<Colors>
  background: Background
}

declare type PaletteColorOptions = PaletteOptionColor

export declare interface PaletteOptions {
  colors?: Partial<Colors>
  primary?: PaletteColorOptions
  secondary?: PaletteColorOptions
  tertiary?: PaletteColorOptions
  error?: PaletteColorOptions
  warning?: PaletteColorOptions
  success?: PaletteColorOptions
  info?: PaletteColorOptions
  background?: Background
  contrastThreshold?: number
}
