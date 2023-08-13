import {
  Color,
  commonColors,
  HexColor,
  RGB,
  RGBA,
  RGBATuple,
  RGBTuple,
  CSSColor
} from '../shared/theme/engine/colors'

export const rgbStringToArray = (color: RGB | RGBA) => {
  if (!Array.isArray(color)) {
    return color.split(/[()]/)[1].split(',').map(Number) as RGBTuple | RGBATuple
  }

  return color
}

function hex2Rgb(hexCode: HexColor): RGBTuple {
  let hex = hexCode.slice(1)
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }
  const value = parseInt(hex, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255

  return [r, g, b]
}

export function isHexColor(color: Color): color is HexColor {
  return typeof color === 'string' && color.startsWith('#')
}

const cssColorToRgbTuple = (color: CSSColor) => {
  if (isHexColor(color)) {
    return hex2Rgb(color)
  }

  if (typeof color !== 'object') {
    return rgbStringToArray(color)
  }

  return color
}

function luminance(color: CSSColor) {
  const rgb = cssColorToRgbTuple(color)
  const [r, g, b] = rgb.map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return r * 0.2126 + g * 0.7152 + b * 0.0722
}

export function getContrastRatio(fgColor: CSSColor, bgColor: CSSColor) {
  const fgLuminance = luminance(fgColor)
  const bgLuminance = luminance(bgColor)
  return bgLuminance < fgLuminance
    ? (bgLuminance + 0.05) / (fgLuminance + 0.05)
    : (fgLuminance + 0.05) / (bgLuminance + 0.05)
}

const setAlpha = (color: HexColor, alpha: number | string) => {
  const opacity = Math.round(Math.min(Math.max(Number(alpha), 0), 1) * 255)
  return color + opacity.toString(16).toUpperCase()
}

export function transparentize(color: CSSColor, alpha: number | string) {
  if (isHexColor(color)) {
    return setAlpha(color, alpha)
  }

  const rgb = cssColorToRgbTuple(color)
  return [...rgb.slice(0, 3), alpha]
}

function padZero(str: string, len?: number) {
  len = len || 2
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export const contrastColor = (color: CSSColor, bwMode = true): HexColor => {
  const [r, g, b] = cssColorToRgbTuple(color)
  if (bwMode) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF'
  } else {
    const invertedRed = (255 - r).toString(16)
    const invertedGreen = (255 - g).toString(16)
    const invertedBlue = (255 - b).toString(16)
    return `#${padZero(invertedRed)}${padZero(invertedGreen)}${padZero(
      invertedBlue
    )}`
  }
}

export const getContrastColor = (
  color: CSSColor,
  contrastThreshold?: number
) => {
  if (contrastThreshold) {
    return getContrastRatio(color, commonColors.white) >= contrastThreshold
      ? commonColors.white
      : contrastColor(color, false)
  }

  return contrastColor(color, false)
}
