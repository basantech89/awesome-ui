import { deepMerge } from '../../../utils'
import colors from './colors'
import {
  Color,
  DefaultColor,
  Palette,
  PaletteDefaultOptions,
  PaletteOptions,
  SupplementColors
} from './palette.types'
import { contrast } from '../../../utils/theme'
import { DeepRequired } from '../../../utils/utils.types'

const dark = {
  primary: colors.coolGray['700'],
  secondary: colors.coolGray['500'],
  disabled: 'rgba(255, 255, 255, 0.5)',
  icon: 'rgba(255, 255, 255, 0.5)'
}

export const light = {
  // The colors used to style the text.
  // The most important text.
  primary: colors.gray['300'],
  // Secondary text.
  secondary: colors.blueGray['200'],
  // Disabled text have even lower visual prominence.
  disabled: 'rgba(0, 0, 0, 0.38)',
  icon: 'rgba(255, 255, 255, 0.5)'
}

const text = { light, dark }

const supplementColors: DeepRequired<SupplementColors> = { text }

export const defaultPaletteOptions: PaletteDefaultOptions = {
  colors: supplementColors,
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

    return contrast(color[500], colors.common.white) >= contrastThreshold
      ? colors.common.white
      : 'rgba(0, 0, 0, 0.87)'
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
