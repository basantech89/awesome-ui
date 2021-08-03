import { Meta, Story } from '@storybook/react'
import React from 'react'

import Spinner, { SpinnerProps } from '.'

export default {
  title: 'Awesome UI/Feedback/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: "Spinner to show on a component's loading state"
      }
    }
  },
  argTypes: {
    color: {
      table: {
        category: 'Color'
      }
    },
    size: {
      control: { type: 'text' },
      defaultValue: '1.5rem'
    },
    speed: {
      control: { type: 'text' },
      defaultValue: '0.5s'
    },
    thickness: {
      control: { type: 'text' },
      defaultValue: '2px'
    }
  }
} as Meta

const Template: Story<SpinnerProps> = args => <Spinner {...args} />

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary'
}

export const Size = Template.bind({})
Size.args = {
  color: 'secondary',
  size: '2rem'
}
