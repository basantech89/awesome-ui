import React from 'react'

export declare type HTMLProps<
  Element,
  Include extends Object = {},
  Exclude extends string = ''
> = React.DetailedHTMLProps<React.HTMLAttributes<Element>, Element> & Include

export declare type BrandColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'warning'
  | 'success'
  | 'info'

export declare type CommonElementSize = 'xs' | 'sm' | 'md' | 'lg'

export declare type CommonElementShape = 'rounded' | 'square'

export declare type CommonElementPlacement = 'left' | 'right'
