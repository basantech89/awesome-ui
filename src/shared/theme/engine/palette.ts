import { deepMerge } from '../../../utils'
import { Color, completeColors, PartialColor } from './colors'
import {
  Palette,
  PaletteColor,
  PaletteDefaultOptions,
  PaletteOptions,
  ThemeComplement
} from './palette.types'
import { getColor } from '../../../utils/theme'
import { getContrastColor, getContrastRatio } from '../../../utils/colors'

const dark: ThemeComplement = {
  primary: completeColors.coolGray['700'],
  secondary: completeColors.coolGray['500'],
  disabled: 'rgba(255, 255, 255, 0.5)',
  icon: 'rgba(255, 255, 255, 0.5)'
}

const light: ThemeComplement = {
  // The colors used to style the text, the most important text.
  primary: completeColors.gray['300'],
  // Secondary text.
  secondary: completeColors.blueGray['200'],
  // Disabled text have even lower visual prominence.
  disabled: 'rgba(0, 0, 0, 0.38)',
  icon: 'rgba(255, 255, 255, 0.5)'
}

export const defaultOptions: PaletteDefaultOptions = {
  primary: completeColors.kesari,
  secondary: completeColors.rose,
  tertiary: completeColors.mango,
  error: completeColors.strawberry,
  warning: completeColors.candy,
  info: completeColors.sky,
  success: completeColors.emerald,
  complement: {
    default: '#fff',
    paper: '#fff',
    light,
    dark
  },
  contrastThreshold: 1.9
}

export default function palette(options: PaletteOptions = {}): Palette {
  const allOptions = deepMerge(defaultOptions, options)
  const {
    primary,
    secondary,
    tertiary,
    info,
    error,
    success,
    warning,
    contrastThreshold,
    ...rest
  } = allOptions

  const contrastColor = (color: PartialColor) => {
    let contrastRatio
    if (color?.contrast) {
      contrastRatio = getContrastRatio(color[500], color.contrast)
      if (contrastRatio >= contrastThreshold) {
        return color.contrast
      }
    }

    return getContrastColor(color[500], contrastThreshold)
  }

  const paletteColors = {
    primary: { ...primary, contrast: contrastColor(primary) },
    secondary: { ...secondary, contrast: contrastColor(secondary) },
    tertiary: { ...tertiary, contrast: contrastColor(tertiary) },
    error: { ...error, contrast: contrastColor(error) },
    success: { ...success, contrast: contrastColor(success) },
    info: { ...info, contrast: contrastColor(info) },
    warning: { ...warning, contrast: contrastColor(warning) }
  }

  return {
    ...paletteColors,
    getColor: (color, intensity = 500) =>
      getColor({ color, paletteColors, intensity, contrastThreshold }),
    ...rest
  }
}
