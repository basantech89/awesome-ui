import { Theme } from '@emotion/react'

import createConfig from './componentConfig/createConfig'
import createPalette from './createPalette'
import createSpacing from './createSpacing'
import createTypography from './createTypography'
import { CreateTheme } from '../theme.types'

const createTheme: CreateTheme = options => {
  const awesomeTheme: Theme = {
    typography: createTypography(options?.typographyOptions),
    palette: createPalette(options?.paletteOptions),
    spacing: createSpacing(options?.spacingOptions),
    config: createConfig(options?.configOptions)
  }

  return awesomeTheme
}

export default createTheme
