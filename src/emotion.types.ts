import '@emotion/react'

import { AwesomeTheme } from './shared/theme/theme.types'

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends AwesomeTheme {}
}
