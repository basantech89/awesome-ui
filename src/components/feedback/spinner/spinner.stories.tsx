import { Meta, Story } from '@storybook/react'
import * as React from 'react'

import Spinner, { SpinnerProps } from '.'
import Box from '../../layout/box'

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

export const Color = Template.bind({})
Color.args = {
  color: 'primary'
}

export const Size = Template.bind({})
Size.args = {
  color: 'secondary',
  size: '2rem'
}

export const variants = ({ ...args }) => (
  <Box>
    <Spinner {...args} color='primary' size='xs' />
    <Spinner {...args} color='secondary' size='sm' />
    <Spinner {...args} color='tertiary' size='md' />
    <Spinner {...args} color='warning' size='lg' />
    <Spinner {...args} color='error' size={9} />
    <Spinner {...args} color='success' size='3rem' />
  </Box>
)
