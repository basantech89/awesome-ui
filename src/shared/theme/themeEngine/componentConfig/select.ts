import { ComponentConfig, ComponentConfigParams } from './index'
import { ThemeSelectProps } from '../../../../components/form/select'
import { css, CSSInterpolation } from '@emotion/css'
import { commonRoundedFlexSizing, cssFlexSizing, FlexSizing } from './common'
import { Spacing } from '../createSpacing'
import { getColor } from '../../../../utils/theme'
import { defaultLabelThemeOptions } from './label'

export declare interface SelectThemeOptions {
  default?: ThemeSelectProps
  sizing?: FlexSizing['rounded']
  base?: CSSInterpolation
  container?: CSSInterpolation
  label?: CSSInterpolation
}

export declare interface DefaultSelectThemeOptions {
  default: Required<ThemeSelectProps>
  sizing: Required<FlexSizing>['rounded']
  base: CSSInterpolation
  container: CSSInterpolation
}

export const defaultSelectThemeOptions = (spacing: Spacing): DefaultSelectThemeOptions => ({
  default: {
    color: 'primary',
    size: 'md',
    ...defaultLabelThemeOptions.default
  },
  sizing: commonRoundedFlexSizing(spacing),
  base: {
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
})

const generateSelectConfig = ({
  props,
  options,
  palette
}: ComponentConfigParams<'select'>): ComponentConfig<'select'> => {
  const { size, direction, ...rest } = props
  const sizing = cssFlexSizing(options.sizing, size)

  const color = getColor(rest.color)

  const borderColor = palette.colors.text.light.secondary
  const arrowColorPure = palette.colors.text.dark.secondary as string
  const arrowColorEncoded = arrowColorPure.replace('#', '%23')

  const appearance = css`
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: 1px solid ${borderColor};
    border-radius: 6px;
    outline: none;
    background-image: url('data:image/svg+xml;utf-8,<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="${arrowColorEncoded}" d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"></path></svg>');
    background-repeat: no-repeat;
    background-position: calc(100% - 15px) 50%;
    background-size: 12px;
    cursor: pointer;
    padding-right: 0;
    transition: all 0.1s;

    &:hover {
      border-color: ${color['500']};
    }

    &:focus {
      border-color: ${color['600']};
    }

    &:active {
      border-color: ${color['700']};
    }

    &:disabled {
      border-color: transparent;
      color: ${arrowColorPure};
      background-color: ${borderColor};
    }
  `

  const base = css`
    ${options.base}
    label: select
  `

  const container = css`
    ${options.container}
    label: container
  `

  return { styles: { main: [sizing, appearance, base], container }, componentOptions: props }
}

export default generateSelectConfig
