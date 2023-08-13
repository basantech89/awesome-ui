import {
  palette,
  spacing,
  typography,
  Palette,
  PaletteOptions,
  Spacing,
  SpacingOptions,
  Typography,
  TypographyOptions
} from './engine'
import { ComponentOptions, componentOptions } from './engine/components'
import { deepMerge, getKeys } from '../../utils'
import { valueOrFn } from '../../utils/primitive'
import { GetValue } from '../../utils/types'

export declare interface AwesomeThemeOptions {
  typography?: TypographyOptions
  palette?: PaletteOptions
  spacing?: SpacingOptions
  components?: {
    [K in keyof ComponentOptions]:
      | GetValue<ComponentOptions[K]>
      | ((
          theme: Omit<AwesomeThemeOptions, 'components'>
        ) => GetValue<ComponentOptions[K]>)
  }
}

export declare interface AwesomeTheme {
  typography: Typography
  palette: Palette
  spacing: Spacing
  components: {
    [K in keyof ComponentOptions]: GetValue<ComponentOptions[K]>
  }
}

const getComponentsConfig = (
  theme: Omit<AwesomeTheme, 'components'>,
  options?: AwesomeThemeOptions['components']
) => {
  return getKeys(componentOptions).reduce<AwesomeTheme['components']>(
    <K extends keyof ComponentOptions>(
      components: AwesomeTheme['components'],
      key: K
    ) => {
      const defaultOptions = valueOrFn(componentOptions[key], theme)

      const providedOptions = valueOrFn(options?.[key], theme)

      components[key] = deepMerge(defaultOptions, providedOptions || {}) as any

      return components
    },
    {} as any
  )
}

const createTheme = (options?: AwesomeThemeOptions): AwesomeTheme => {
  const theme = {
    typography: typography(options?.typography),
    palette: palette(options?.palette),
    spacing: spacing(options?.spacing)
  }

  return {
    ...theme,
    components: getComponentsConfig(theme, options?.components)
  }
}

export default createTheme
