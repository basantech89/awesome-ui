import chroma from 'chroma-js'

import { deepMerge } from '../../../utils'
import colors from './colors'
import { Palette, PaletteOptions } from './palette'

export const defaultPaletteOptions = {
  colors,
  primary: {
    light: colors.kesari[300],
    main: colors.kesari[500],
    dark: colors.kesari[700]
  },
  secondary: {
    light: colors.rose[300],
    main: colors.rose[500],
    dark: colors.rose[700]
  },
  tertiary: {
    light: colors.mango[300],
    main: colors.mango[500],
    dark: colors.mango[700],
    contrast: colors.mango.contrast[500]
  },
  error: {
    light: colors.strawberry[300],
    main: colors.strawberry[500],
    dark: colors.strawberry[700]
  },
  warning: {
    light: colors.candy[300],
    main: colors.candy[500],
    dark: colors.candy[700]
  },
  info: {
    light: colors.sky[300],
    main: colors.sky[500],
    dark: colors.sky[700]
  },
  success: {
    light: colors.emerald[300],
    main: colors.emerald[500],
    dark: colors.emerald[700]
  },
  background: {
    default: '',
    paper: ''
  },
  contrastThreshold: 2
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

export default function createPalette(
  paletteOptions: PaletteOptions = defaultPaletteOptions
): Palette {
  const { primary, secondary, tertiary, info, error, success, warning, ...rest } = paletteOptions

  const getContrastColor = color => {
    let contrast
    if (color.contrast) {
      contrast = chroma.contrast(color.main, color.contrast)
      if (contrast >= paletteOptions.contrastThreshold) {
        return color.contrast
      }
    }
    return chroma.contrast(color.main, dark.text.primary) >= paletteOptions.contrastThreshold
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
    background: paletteOptions.background,
    colors: paletteOptions.colors
  }
}
