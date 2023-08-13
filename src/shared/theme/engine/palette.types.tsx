import {
  PartialColor,
  DefaultColor,
  CSSColor,
  BrandColor,
  Color,
  HTMLColor
} from './colors'
import { getColor } from '../../../utils/theme'

export type ThemeComplement = {
  primary: CSSColor
  secondary: CSSColor
  disabled: CSSColor
  icon: CSSColor
}

type Complement = {
  default?: CSSColor
  paper?: CSSColor
  light?: ThemeComplement
  dark?: ThemeComplement
}

export declare interface TextColors {
  primary?: CSSColor
  secondary?: CSSColor
  disabled?: CSSColor
  icon?: CSSColor
}

export declare interface SupplementColors {
  text?: {
    light?: TextColors
    dark?: TextColors
  }
}

export declare interface PaletteOptions
  extends Partial<Record<BrandColor, PartialColor>> {
  colors?: SupplementColors
  complement?: Complement
  contrastThreshold?: number
}

declare type PaletteDefaultColors = Record<BrandColor, Required<DefaultColor>>

export declare interface PaletteDefaultOptions extends PaletteDefaultColors {
  complement: Required<Complement>
  contrastThreshold: number
}

export declare interface PaletteColor extends DefaultColor {
  contrast: CSSColor
}

export declare type PaletteColors = Record<BrandColor, PaletteColor>

export declare interface Palette extends PaletteColors {
  complement: Required<Complement>
  getColor: (
    color: Color,
    intensity?: keyof PaletteColor
  ) => CSSColor | HTMLColor
}
