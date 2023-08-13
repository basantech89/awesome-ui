import React from 'react'
import AwesomeThemeProvider from "../src/shared/theme/provider";

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const withGlobalStyle = storyFn => (
  <>
    {storyFn()}
  </>
)

const withTheme = Story => (
  <AwesomeThemeProvider>
    <Story />
  </AwesomeThemeProvider>
)

export const decorators = [withGlobalStyle, withTheme]
