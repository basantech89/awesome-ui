import { Meta, Story } from '@storybook/react'
import React from 'react'

import Input from '.'

export default {
  title: 'Awesome UI/Form/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'Input Component'
      }
    }
  }
} as Meta

const Template: Story = args => <Input />

export const Primary = Template.bind({})
