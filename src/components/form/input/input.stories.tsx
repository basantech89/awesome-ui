import { Meta, Story } from '@storybook/react'
import React from 'react'

import Input, {
  InputBox,
  InputBoxProps,
  InputGroup,
  InputLeftAddon,
  InputLeftExtension,
  InputProps,
  InputRightAddon,
  InputRightExtension
} from '.'
import { brandColors } from '../../../constants/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Box from '../../layout/box'
import { faPhone } from '@fortawesome/free-solid-svg-icons/faPhone'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'

export default {
  title: 'Awesome UI/Form/Input',
  component: Input,
  argTypes: {
    color: {
      control: { type: 'inline-radio' },
      options: brandColors
    },
    rounded: {
      defaultValue: true
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Input Component'
      }
    }
  }
} as Meta

const Template: Story<InputProps> = args => <Input {...args} />
export const square = Template.bind({})
square.args = {
  color: 'primary',
  rounded: false
}

export const rounded = Template.bind({})
rounded.args = {
  color: 'success',
  rounded: true
}

export const addons = () => (
  <Box d='flex' gap={5} style={{ flexDirection: 'column' }}>
    <InputGroup>
      <InputLeftAddon addon='Test' />
      <Input />
    </InputGroup>
    <InputGroup>
      <Input color='secondary' />
      <InputRightAddon addon='Test' />
    </InputGroup>
    <InputGroup>
      <InputLeftAddon addon='https://' />
      <Input color='success' />
      <InputRightAddon addon='.com' />
    </InputGroup>
  </Box>
)

export const feedback = () => (
  <Box d='flex' gap={2} flexDirection='column'>
    <InputBox
      label='Email'
      feedbackProps={{
        error: true,
        message: 'Invalid Email'
      }}
    >
      <Input placeholder='abc@example.com' />
    </InputBox>
    <InputBox
      label='First Name'
      feedbackProps={{
        message: 'Input is valid'
      }}
    >
      <Input placeholder='John' />
    </InputBox>
  </Box>
)

export const extensions = () => (
  <Box d='flex' gap={5} flexDirection='column'>
    <InputGroup>
      <InputLeftExtension extension={<FontAwesomeIcon icon={faPhone} />} />
      <Input />
      <InputRightExtension extension='Test' />
    </InputGroup>
    <InputGroup>
      <InputLeftExtension extension={<FontAwesomeIcon icon={faPhone} />} />
      <Input placeholder='Type here' color='success' />
      <InputRightExtension extension={<FontAwesomeIcon icon={faCheck} />} />
    </InputGroup>
  </Box>
)

export const sizes = () => (
  <Box d='flex' flexDirection='column' gapY={4}>
    <Input size='xs' placeholder='Size XS' />
    <Input size='sm' placeholder='Size SM' />
    <Input placeholder='Size MD' />
    <Input size='lg' placeholder='Size LG' />
  </Box>
)

const InputBoxTemplate: Story<InputBoxProps> = args => (
  <InputBox {...args}>
    <Input placeholder='abc@example.com' />
  </InputBox>
)

export const inputBox = InputBoxTemplate.bind({})
inputBox.args = {
  label: 'Email',
  feedbackProps: {
    error: true,
    message: 'Invalid Email'
  }
}

export const form = () => (
  <>
    <Box d='flex' gapX={10} mb={5}>
      <InputBox
        label='Email'
        feedbackProps={{
          error: true,
          message: 'Invalid Email'
        }}
      >
        <Input placeholder='abc@example.com' error />
      </InputBox>
      <InputBox label='Password'>
        <Input placeholder='Password' type='password' />
      </InputBox>
    </Box>
  </>
)
