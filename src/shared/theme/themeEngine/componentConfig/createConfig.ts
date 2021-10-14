import { ConfigOptions, ThemeConfig } from '../../theme.types'
import generateButtonConfig from './button'
import generateSpinnerStyles from './spinner'

const createConfig = (config?: ConfigOptions): ThemeConfig => {
  return {
    button: generateButtonConfig(config?.button),
    spinner: generateSpinnerStyles(config?.spinner)
  }
}

export default createConfig
