import { ThemeProps } from '../shared/theme/themeEngine/componentConfig'
import { ThemeBoxProps } from '../components/layout/box'

const labelThemingProps: Array<keyof ThemeProps['label']> = ['spacing', 'direction']

declare type ThemingProps = {
  [Key in keyof ThemeProps]: Array<keyof ThemeProps[Key]>
} & {
  box: Array<keyof ThemeBoxProps>
}

const themingProps: ThemingProps = {
  box: [
    'gap',
    'gapX',
    'gapY',
    'm',
    'ml',
    'mr',
    'mt',
    'mb',
    'p',
    'pl',
    'pr',
    'pt',
    'pb',
    'h',
    'd',
    'w'
  ],
  button: [
    'size',
    'color',
    'variant',
    'rounded',
    'loading',
    'icon',
    'iconPlacement',
    'iconSpacing',
    'spinner',
    'spinnerPlacement',
    'spinnerSpacing'
  ],
  iconButton: ['color', 'size'],
  spinner: ['color', 'speed', 'size', 'thickness'],
  input: ['type', 'color', 'rounded', 'error', 'variant'],
  label: labelThemingProps,
  select: [...labelThemingProps, 'size', 'color'],
  autoComplete: []
}

export default themingProps
