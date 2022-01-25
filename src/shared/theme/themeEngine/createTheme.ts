import { Theme } from '@emotion/react'

import createPalette from './createPalette'
import createSpacing from './createSpacing'
import createTypography from './createTypography'
import { CreateTheme } from '../theme.types'

const createTheme: CreateTheme = options => {
  const awesomeTheme: Theme = {
    typography: createTypography(options?.typographyOptions),
    palette: createPalette(options?.paletteOptions),
    spacing: createSpacing(options?.spacingOptions),
    componentConfigOptions: options?.componentConfigOptions || {}
  }

  return awesomeTheme
}

export default createTheme
