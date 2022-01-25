import React from 'react'
import { CommonElementSize, HTMLProps } from '../../../types'
import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'
import { css, cx } from '@emotion/css'

import Input, {
  InputBox,
  InputBoxProps,
  InputGroup,
  InputProps,
  InputRightExtension
} from '../input'
import { getColor } from '../../../utils/theme'
import theme from '../../../shared/theme'
import IconButton from '../iconButton'

export declare interface DropdownOption extends HTMLProps<HTMLOptionElement> {
  label: string
  value: string
}

export declare interface ThemeAutoCompleteProps {
  size?: CommonElementSize
}

export declare interface AutoCompleteProps extends ThemeAutoCompleteProps, InputBoxProps {
  options: DropdownOption[]
  id: string
  inputProps: InputProps
}

const AutoComplete: React.FC<AutoCompleteProps> = props => {
  const { children, className, label, id, spacing, direction, inputProps, options, ...rest } = props
  const { styles } = useAwesomeStyles(rest, 'autoComplete')
  const color = getColor(rest.color || 'primary')

  const _triggerCss = css`
    height: 16px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding-right: 10px;
  `

  const _listOpenedCss = css`
    top: 15px;
    opacity: 1;
  `

  const _listClosedCss = css`
    position: absolute;
    top: 0;
    opacity: 0;
    padding: 0;
    width: 100%;
    border: 1px solid ${theme.palette.colors.text.light.secondary};
    border-radius: 14px;
    transition: all 0.2s ease-out;
  `

  const _listItemCss = css`
    list-style-type: none;
    padding: 10px;
    &:first-child {
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
    }
    &:last-child {
      border-bottom-left-radius: 14px;
      border-bottom-right-radius: 14px;
    }
    &:hover {
      background-color: ${color[200]};
    }
    &:active {
      background-color: ${color[300]};
    }
  `

  const [filteredOptions, setFilteredOptions] = React.useState(options)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const triggerMenuOpen = () => setMenuOpen(!menuOpen)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value
    setFilteredOptions(options.filter(option => option.value === value))
    setMenuOpen(true)
  }

  return (
    <InputBox htmlFor={id} label={label} spacing={spacing} direction={direction}>
      <InputGroup>
        <Input
          id={id}
          placeholder='Select'
          onChange={handleChange}
          rounded
          color='primary'
          {...inputProps}
        />
        {/*<InputRightExtension*/}
        {/*  extension={*/}
        {/*    <IconButton*/}
        {/*      onClick={triggerMenuOpen}*/}
        {/*      icon={<TriggerIcon className={cx(_triggerCss)} />}*/}
        {/*    />*/}
        {/*  }*/}
        {/*/>*/}
      </InputGroup>
      <ul className={cx(_listClosedCss, menuOpen && _listOpenedCss)}>
        {filteredOptions.map(({ label, value }) => (
          <li key={value} className={cx(_listItemCss)}>
            {label}
          </li>
        ))}
      </ul>
    </InputBox>
  )
}

export default AutoComplete
