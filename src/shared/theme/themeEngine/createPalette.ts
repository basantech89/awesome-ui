import { deepMerge } from '../../../utils'
import colors from './colors'
import {
  Color,
  DefaultColor,
  Palette,
  PaletteDefaultOptions,
  PaletteOptions
} from './palette.types'
import { contrast } from '../../../utils/theme'

export const defaultPaletteOptions: PaletteDefaultOptions = {
  colors,
  primary: colors.kesari,
  secondary: colors.rose,
  tertiary: colors.mango,
  error: colors.strawberry,
  warning: colors.candy,
  info: colors.sky,
  success: colors.emerald,
  background: {
    default: '',
    paper: ''
  },
  contrastThreshold: 1.9
}

const dark = {
  text: {
    primary: colors.common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  }
}

export const light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)'
  }
}

export default function createPalette(paletteOptions: PaletteOptions = {}): Palette {
  const allPaletteOptions = deepMerge(defaultPaletteOptions, paletteOptions)
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
  } = allPaletteOptions

  const getContrastColor = (color: DefaultColor & Color) => {
    let contrastColor
    if (color?.contrast) {
      contrastColor = contrast(color[500], color.contrast)
      if (contrastColor >= contrastThreshold) {
        return color.contrast
      }
    }

    return contrast(color[500], dark.text.primary) >= contrastThreshold
      ? dark.text.primary
      : light.text.primary
  }

  return {
    primary: { ...primary, contrast: getContrastColor(primary) },
    secondary: { ...secondary, contrast: getContrastColor(secondary) },
    tertiary: { ...tertiary, contrast: getContrastColor(tertiary) },
    error: { ...error, contrast: getContrastColor(error) },
    success: { ...success, contrast: getContrastColor(success) },
    info: { ...info, contrast: getContrastColor(info) },
    warning: { ...warning, contrast: getContrastColor(warning) },
    ...rest
  }
}
