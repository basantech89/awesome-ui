import React from 'react'
import Select, { DropdownOption, SelectProps } from './index'
import { Story } from '@storybook/react'

export default {
  title: 'Awesome UI/Form/Select',
  component: Select
}

const dropdownOptions: DropdownOption[] = [
  {
    label: 'One',
    value: 'one'
  },
  {
    label: 'Two',
    value: 'two'
  },
  {
    label: 'Three',
    value: 'three'
  },
  {
    label: 'Four',
    value: 'four'
  },
  {
    label: 'Five',
    value: 'five'
  }
]

const Template: Story<SelectProps> = args => <Select {...args} />
export const simple = Template.bind({})
simple.args = {
  label: 'Number',
  color: 'success',
  options: dropdownOptions
}

export const disabled = Template.bind({})
disabled.args = {
  label: 'Number',
  options: dropdownOptions,
  disabled: true
}
