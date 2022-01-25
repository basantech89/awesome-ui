import IconButton, { IconButtonProps } from './index'
import { Story } from '@storybook/react'
import * as React from 'react'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default {
  title: 'Awesome UI/Form/IconButton',
  component: IconButton,
  argTypes: {
    color: {
      table: {
        category: 'Color'
      }
    },
    size: {
      control: { type: 'text' },
      defaultValue: 'md'
    }
  }
}

const Template: Story<IconButtonProps> = args => <IconButton {...args} />
export const Simple = Template.bind({})
Simple.args = {
  icon: <FontAwesomeIcon icon={faPhone} color='white' />,
  size: '30px'
}

export const disabled = Template.bind({})
disabled.args = {
  ...Simple.args,
  disabled: true
}
