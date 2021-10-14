import { ClassNamesArg } from '@emotion/css'
import { Theme } from '@emotion/react'
import { CommonElementSize } from '../../../../types'

export declare interface ComponentConfigObject<T> {
  styles: ClassNamesArg[]
  componentOptions: T
}

export declare type ComponentConfig<P, T> = (
  componentPros: P,
  theme: Theme
) => ComponentConfigObject<T>

export declare type Sizing = Record<CommonElementSize, string | number>
