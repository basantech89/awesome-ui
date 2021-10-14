import { Theme } from '@emotion/react'

import createTheme from './themeEngine/createTheme'

const theme: Theme = createTheme()

export default theme

export { default as AwesomeThemeProvider } from './provider'
