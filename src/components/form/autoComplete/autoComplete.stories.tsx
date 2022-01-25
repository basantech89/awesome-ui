import React from 'react'
import AutoComplete, { DropdownOption, AutoCompleteProps } from './index'
import { Story } from '@storybook/react'

export default {
  title: 'Awesome UI/Form/AutoComplete',
  component: AutoComplete
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

const Template: Story<AutoCompleteProps> = args => <AutoComplete {...args} />
export const controlled = Template.bind({})
controlled.args = {
  label: 'Number',
  color: 'success',
  options: dropdownOptions
}
