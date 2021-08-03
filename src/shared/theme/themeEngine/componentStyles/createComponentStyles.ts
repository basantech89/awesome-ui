import generateButtonStyles, { defaultButtonOptions } from './button'
import { ComponentStyleOptions, ComponentStyles } from './components'
import generateSpinnerStyles from './spinner'

const createComponentStyles = (): ComponentStyles => {
  return {
    button: generateButtonStyles(),
    spinner: generateSpinnerStyles()
  }
}

export default createComponentStyles
