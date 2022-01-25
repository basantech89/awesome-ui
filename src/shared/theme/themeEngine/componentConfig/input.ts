import { css, CSSInterpolation } from '@emotion/css'
import { getColor, getSpacing } from '../../../../utils/theme'
import { ComponentConfig, ComponentConfigParams } from './index'
import { ThemeInputProps } from '../../../../components/form'
import { commonFlexSizing, cssFlexSizing, FlexSizing } from './common'
import { Spacing } from '../createSpacing'
import { DeepRequired } from '../../../../utils/utils.types'
import { get } from '../../../../utils'

export declare interface InputThemeOptions {
  default?: ThemeInputProps
  base?: CSSInterpolation
  sizing?: FlexSizing
}

export declare interface DefaultInputThemeOptions {
  default: Omit<Required<ThemeInputProps>, 'feedback'>
  base: CSSInterpolation
  sizing: DeepRequired<FlexSizing>
}

export const getDefaultInputThemeOptions = (spacing: Spacing): DefaultInputThemeOptions => ({
  default: {
    type: 'text',
    color: 'primary',
    variant: 'outlined',
    rounded: false,
    error: false,
    size: 'md'
  },
  base: {
    lineHeight: 1
  },
  sizing: commonFlexSizing(spacing)
})

const generateInputConfig = ({
  props,
  options,
  palette
}: ComponentConfigParams<'input'>): ComponentConfig<'input'> => {
  const { color, rounded, error, size } = props
  const borderColor = error ? palette.error : getColor(color)

  const shape = rounded ? 'rounded' : 'square'
  const sizingOptions = get(options.sizing, shape)
  const sizing = cssFlexSizing(sizingOptions, size)

  const appearance = css`
    outline: none;
    appearance: none;
    border: 1px solid ${palette.colors.text.light.secondary};
    box-shadow: rgb(0 0 0 / 3%) 0 0 0 1px inset;
    width: 100%;
    border-radius: ${rounded ? getSpacing(3.5) : getSpacing(1.5)};
    background: transparent;
    color: ${palette.colors.text.dark.primary};
    transition: all 0.1s;

    &:focus {
      border: 1px solid ${borderColor['400']};
    }
    &:active {
      border: 1px solid ${borderColor['500']};
    }
  `

  const base = css`
    ${options.base}
    label: input
  `

  return { styles: { main: [base, sizing, appearance] }, componentOptions: props }
}

export default generateInputConfig
