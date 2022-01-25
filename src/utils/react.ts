import React, { ReactElement, ReactNode } from 'react'

export const getValidChildren = (children: ReactNode | ReactNode[]): ReactElement[] =>
  React.Children.toArray(children).filter(React.isValidElement)
