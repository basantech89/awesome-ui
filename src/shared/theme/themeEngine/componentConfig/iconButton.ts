import { ThemeIconButtonProps } from '../../../../components/form/iconButton'
import { ComponentConfig, ComponentConfigParams } from './index'
import { css } from '@emotion/css'
import { getColor, getSpacing, SpacingSizing } from '../../../../utils/theme'
import { DeepRequired } from '../../../../utils/utils.types'
import { simpleSizing, SimpleSizingOptions } from './common'

export declare interface ThemeIconButtonOptions {
  default?: ThemeIconButtonProps
  sizing: SimpleSizingOptions
}

export const defaultIconButtonThemeOptions: DeepRequired<ThemeIconButtonOptions> = {
  default: {
    size: 'md',
    color: 'primary',
    rounded: true
  },
  sizing: simpleSizing
}

const generateIconButtonConfig = ({
  props,
  options
}: ComponentConfigParams<'iconButton'>): ComponentConfig<'iconButton'> => {
  const { color, size, rounded } = props
  const shape = rounded ? 'rounded' : 'square'
  const buttonShape = options.sizing[shape] as SpacingSizing
  const buttonSize = getSpacing(size, buttonShape)

  const styles = css`
    width: ${buttonSize};
    height: ${buttonSize};
    border: none;
    background-color: ${getColor(color, 500)};
    border-radius: ${rounded ? '16px' : '8px'};
    cursor: pointer;
    transform: translate3d(0, 0, 0);
    outline: none;
    appearance: none;
    &:hover {
      background-color: ${getColor(color, 600)};
    }
    &:active {
      transform: translate3d(0, 2px, 0);
      background-color: ${getColor(color, 700)};
    }
    &:disabled {
      transform: none;
      cursor: not-allowed;
      background-color: ${getColor(color, 300)};
    }

    svg {
      max-width: ${buttonSize};
      max-height: ${buttonSize};
    }
  `

  return { styles: { main: [styles] }, componentOptions: props }
}

export default generateIconButtonConfig
