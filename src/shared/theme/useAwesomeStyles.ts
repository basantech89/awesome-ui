import { useTheme } from '@emotion/react'
import componentConfigCollection, {
  ComponentConfig,
  DefaultComponentConfigOptions,
  defaultComponentConfigOptions
} from './themeEngine/componentConfig'
import { deepMerge, get } from '../../utils'
import { valueOrFn } from '../../utils/primitive'

const useAwesomeStyles = <P extends Object, K extends keyof DefaultComponentConfigOptions>(
  props: P,
  componentKey: K
): ComponentConfig<K> => {
  const { componentConfigOptions, ...theme } = useTheme()

  const defaultOptions = get(defaultComponentConfigOptions, componentKey)
  const defaultConfigOptions = valueOrFn(defaultOptions, theme.spacing)

  const options = get(componentConfigOptions || {}, componentKey, {})
  const configOptions = valueOrFn(options, theme.spacing)

  const mergedOptions = deepMerge(defaultConfigOptions, configOptions)
  const mergedProps = deepMerge(mergedOptions.default, props)

  const config = get(componentConfigCollection, componentKey, {})
  return config({ props: mergedProps, options: mergedOptions, ...theme })
}

export default useAwesomeStyles
