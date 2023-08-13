import {
  ComponentConfigGenerator,
  componentMethods,
  ComponentOptions
} from './engine/components'
import { deepMerge } from '../../utils'
import { useAwesomeTheme } from './provider'
import { SpinnerProps } from '../../components/feedback/spinner'
import { ButtonProps } from '../../components/form'

type ComponentProps = {
  spinner: Omit<SpinnerProps, 'className'>
  button: Omit<ButtonProps, 'className'>
}

const useAwesomeStyles = <K extends keyof ComponentOptions>(
  props: ComponentProps[K],
  componentKey: K
): ReturnType<ComponentConfigGenerator[K]> => {
  const theme = useAwesomeTheme()

  const options = theme.components[componentKey]

  const mergedProps = deepMerge(options.default, props)

  const config = componentMethods[componentKey]
  return config(mergedProps, options, theme)
}

export default useAwesomeStyles
