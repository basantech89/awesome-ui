import React from 'react'

import createTheme from '../themeEngine/createTheme'
import { ThemeProvider } from '@emotion/react'

const theme = createTheme()

const AwesomeThemeContext = React.createContext(theme)

const AwesomeThemeProvider: React.FC = props => {
  const theme = createTheme()
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

const useAwesomeTheme = () => {
  const context = React.useContext(AwesomeThemeContext)
  if (!context) {
    throw new Error('AwesomeThemeContext can be used in a AwesomeThemeProvider only')
  }
  return context
}

export default AwesomeThemeProvider
export { useAwesomeTheme }
