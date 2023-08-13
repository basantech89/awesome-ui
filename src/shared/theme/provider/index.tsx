import React from 'react'

import createTheme, { AwesomeTheme } from '..'

const theme = createTheme()

const AwesomeThemeContext = React.createContext(theme)

const AwesomeThemeProvider: React.FC<{ theme?: AwesomeTheme }> = props => {
  return (
    <AwesomeThemeContext.Provider value={props.theme || theme}>
      {props.children}
    </AwesomeThemeContext.Provider>
  )
}

const useAwesomeTheme = () => {
  const context = React.useContext(AwesomeThemeContext)
  if (!context) {
    throw new Error(
      'AwesomeThemeContext can be used in a AwesomeThemeProvider only'
    )
  }

  return context
}

export default AwesomeThemeProvider
export { useAwesomeTheme, theme as defaultTheme }
