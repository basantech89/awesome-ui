import * as React from 'react'

import { deepMerge } from '../../../utils'
import { Typography, TypographyDefaultOptions, TypographyOptions } from './typography.types'

const defaultFontFamily = 'Poppins, Helvetica, Arial, sans-serif'

const caseAllCaps = {
  textTransform: 'uppercase'
}

function round(value: number) {
  return Math.round(value * 1e5) / 1e5
}

const getCoefficient = (fontSize: number) => fontSize / 14

const defaultHtmlFontSize = 16
const defaultFontSize = 14
let coefficient = getCoefficient(defaultFontSize)

export const defaultTypographyOptions: TypographyDefaultOptions = {
  fontFamily: defaultFontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  // The default font size.
  fontSize: 14,
  htmlFontSize: 16,
  pxToRem: size => `${(size / defaultHtmlFontSize) * coefficient}rem`
}

export default function createTypography(typographyOption: TypographyOptions = {}): Typography {
  const options = deepMerge(typographyOption, defaultTypographyOptions)

  const {
    fontFamily,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold,
    fontSize,
    htmlFontSize,
    pxToRem,
    ...typographyRest
  } = options

  coefficient = getCoefficient(fontSize)
  const defaultPxToRem = pxToRem || (size => `${(size / htmlFontSize) * coefficient}rem`)
  const buildVariant = (
    fontWeight: React.CSSProperties['fontWeight'],
    size: number,
    lineHeight: number,
    letterSpacing: number,
    casing?: typeof caseAllCaps
  ) => ({
    fontFamily,
    fontWeight,
    fontSize: defaultPxToRem(size),
    lineHeight,
    ...(fontFamily === defaultFontFamily
      ? { letterSpacing: `${round(letterSpacing / size)}em` }
      : {}),
    ...casing
  })

  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  }

  return deepMerge(
    {
      htmlFontSize,
      pxToRem,
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightBold,
      ...variants
    },
    typographyRest
  )
}
