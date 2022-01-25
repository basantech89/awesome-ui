import React from 'react'
import theme from '../src/shared/theme'
import { ThemeProvider } from '@emotion/react'
import GlobalStyles from '../src/shared/global'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const withGlobalStyle = storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
)

const withTheme = Story => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
)

export const decorators = [withGlobalStyle, withTheme]
