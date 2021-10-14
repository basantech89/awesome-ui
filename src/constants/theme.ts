import { BrandColor, CommonElementSize } from '../types'

export const brandColors: BrandColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'success',
  'info',
  'warning',
  'error'
]

export const commonSizes: CommonElementSize[] = ['xs', 'sm', 'md', 'lg']

export const cssDimensions = {
  m: 'margin',
  p: 'padding'
} as const

export const cssDirections = {
  t: ['top'],
  b: ['bottom'],
  l: ['left'],
  r: ['right']
} as const

export const directions = {
  ...cssDirections,
  x: ['left', 'right'],
  y: ['top', 'bottom'],
  z: ['left', 'right', 'top', 'bottom']
} as const

export const layoutDimensions = {
  w: 'width',
  h: 'height'
} as const

export const otherDimension = {
  ...layoutDimensions
}

export const cssPropMap = {
  t: 'top',
  b: 'bottom',
  l: 'left',
  r: 'right',
  ...otherDimension
}
