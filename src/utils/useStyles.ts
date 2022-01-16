import { get } from './object'
import { useTheme } from '@emotion/react'

export const useAwesomeStyles = (componentName: string, props: any = {}) => {
  const theme = useTheme()

  const styleConfig = get(theme, `componentStyles.${componentName}`)

  const { getAppearance, getSizing, getBaseStyles } = styleConfig
  const sizing = getSizing(props)
  const appearance = getAppearance(props)

  return { ...appearance, ...sizing, ...getBaseStyles }
}

export default useAwesomeStyles
