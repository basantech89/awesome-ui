import { ThemeLabelProps } from '../../../../components/data/label'
import { ComponentConfig, ComponentConfigParams } from './index'
import { css } from '@emotion/css'
import { getSpacing } from '../../../../utils/theme'

export interface DefaultLabelThemeOptions {
  default: Required<ThemeLabelProps>
}

export const defaultLabelThemeOptions: DefaultLabelThemeOptions = {
  default: {
    spacing: '10px',
    direction: 'row'
  }
}

const generateLabelConfig = ({
  props,
  options,
  palette
}: ComponentConfigParams<'label'>): ComponentConfig<'label'> => {
  const { direction, spacing } = options.default

  const styles = css`
    display: inline-block;
    color: ${palette.colors.text.dark.secondary};
    min-width: 100px;
    ${direction === 'row' ? 'padding-right' : 'padding-bottom'}: ${typeof spacing === 'number'
      ? getSpacing(spacing)
      : spacing};
    label: label;
  `

  return { styles: { main: [styles] }, componentOptions: props }
}

export default generateLabelConfig
