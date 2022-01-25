import React from 'react'
import { CommonElementSize, HTMLProps } from '../../../types'
import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'

import { ThemeColor } from '../../../shared/theme/theme.types'
import Label, { LabelProps, ThemeLabelProps } from '../../data/label'
import { cx } from '@emotion/css'
import { omit } from '../../../utils'
import themingProps from '../../../constants/themingProps'

export declare interface DropdownOption extends HTMLProps<HTMLOptionElement> {
  label: string
  value: string
}

export declare interface ThemeSelectProps extends ThemeLabelProps {
  size?: CommonElementSize
  color?: ThemeColor
}

export declare interface SelectProps
  extends ThemeSelectProps,
    Partial<LabelProps>,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'color' | 'size'> {
  options: DropdownOption[]
  id?: string
}

const Select: React.FC<SelectProps> = props => {
  const { children, className, label, id, options, ...rest } = props
  const {
    styles: { main, container, label: labelCss },
    componentOptions: { spacing, direction }
  } = useAwesomeStyles(rest, 'select')

  return (
    <div className={cx(container)}>
      {label && (
        <Label
          label={label}
          htmlFor={id}
          spacing={spacing}
          direction={direction}
          className={cx(labelCss)}
        />
      )}
      <select className={cx(...main)} {...omit(rest, themingProps.select)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
