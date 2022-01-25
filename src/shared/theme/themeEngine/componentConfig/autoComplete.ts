import { ComponentConfig, ComponentConfigParams } from './index'
import { ThemeSelectProps } from '../../../../components/form/select'
import { css, CSSInterpolation } from '@emotion/css'
import { commonRoundedFlexSizing, cssFlexSizing, FlexSizing } from './common'
import { DeepRequired } from '../../../../utils/utils.types'
import { Spacing } from '../createSpacing'
import { getColor } from '../../../../utils/theme'

export declare interface AutoCompleteThemeOptions {
  default?: ThemeSelectProps
  sizing?: FlexSizing['rounded']
  base?: CSSInterpolation
}

export declare interface DefaultAutoCompleteThemeOptions {
  default: Required<ThemeSelectProps>
  sizing: DeepRequired<FlexSizing['rounded']>
  base: CSSInterpolation
}

export const defaultAutoCompleteThemeOptions = (spacing: Spacing): any => ({
  default: {
    color: 'primary',
    size: 'md'
  },
  sizing: commonRoundedFlexSizing(spacing),
  base: {
    width: '100%'
  }
})

const generateAutoCompleteConfig = ({
  props,
  options,
  palette
}: ComponentConfigParams<'autoComplete'>): ComponentConfig<'autoComplete'> => {
  const { size, ...rest } = props
  // const sizing = cssFlexSizing(options.sizing, size)

  // const color = getColor(rest.color, 500)

  const appearance = css`
    appearance: none;
    border: 1px solid ${palette.colors.text.light.secondary};
    background-color: transparent;
    border-radius: 6px;
    outline: none;
    &::after {
      content: '';
      width: 0;
      height: 0;
      border: 7px solid red;
      background-color: aqua;
    }

    &::-ms-expand {
      display: none; /* Hide the default arrow in Internet Explorer 10 and Internet Explorer 11 */
    }

    option {
      appearance: none;
      &:hover::after,
      &:active,
      &:focus {
      }
    }
  `

  const base = css`
    ${options.base}
  `

  const option = css`
    &:hover {
    }
  `

  return { styles: { main: [appearance, base] }, componentOptions: props }
}

export default generateAutoCompleteConfig
