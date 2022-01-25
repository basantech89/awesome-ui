import Box, { BoxProps } from '.'
import { InputBox } from '../../form'
import Input from '../../form/input'
import React from 'react'
import { Story } from '@storybook/react'

export default {
  title: 'Awesome UI/Layout/Box',
  component: Box
}

const Template: Story<BoxProps> = args => (
  <Box {...args}>
    <InputBox label='Email'>
      <Input />
    </InputBox>
    <InputBox label='Password'>
      <Input />
    </InputBox>
  </Box>
)

export const inputBox = Template.bind({})
inputBox.args = {
  d: 'flex',
  gap: 5,
  flexDirection: 'column'
}
