import React from 'react'
import { sizes } from '../../constants/theme'
import type * as CSS from 'csstype'

export declare type HTMLProps<Element, Include extends Object = {}> =
  React.DetailedHTMLProps<React.HTMLAttributes<Element>, Element> & Include

export type XStyles = { [P in CSS.SimplePseudos]?: CSS.Properties } &
  CSS.Properties &
  CSS.PropertiesHyphen

export declare type ElementShape = 'rounded' | 'square'

export declare type ElementPlacement = 'left' | 'right'

export type ElementSize = typeof sizes[number]

export type ShapeSizing = Record<
  ElementShape,
  Record<ElementSize, Partial<XStyles>>
>

export type Sizing = Record<ElementSize, string>
