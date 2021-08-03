import { Theme } from '@emotion/react'

import { deepMerge } from '../../../utils'
import createComponentStyles from './componentStyles/createComponentStyles'
import createPalette from './createPalette'
import createSpacing from './createSpacing'
import createTypography from './createTypography'
import { CreateTheme } from './types'

const createTheme: CreateTheme = (options, ...args) => {
  let awesomeTheme: Theme = {
    typography: createTypography(options?.typographyOptions),
    palette: createPalette(options?.paletteOptions),
    spacing: createSpacing(options?.spacingOptions),
    componentStyles: createComponentStyles()
  }
  awesomeTheme = args.reduce((acc, argument) => deepMerge(acc, argument), awesomeTheme)
  return awesomeTheme
}

export default createTheme
