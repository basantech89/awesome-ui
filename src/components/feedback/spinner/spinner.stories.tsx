import { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

import { Spinner } from '.'

const meta = {
  title: 'Awesome UI/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    size: { control: 'text' }
  }
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof Spinner>

export const WithControls: Story = {
  args: {
    color: 'primary',
    size: 'sm',
    speed: '0.5s',
    thickness: '2px'
  }
}

export const Colors: Story = {
  args: {
    size: 'sm',
    speed: '0.5s',
    thickness: '2px'
  },
  render: args => (
    <>
      <Spinner color="primary" {...args} />
      <Spinner color="secondary" {...args} />
      <Spinner color="tertiary" {...args} />
      <Spinner color="success" {...args} />
      <Spinner color="info" {...args} />
      <Spinner color="warning" {...args} />
      <Spinner color="error" {...args} />
      <Spinner color="flamingo" {...args} />
      <Spinner color="onyx" {...args} />
      <Spinner color="aqua" {...args} />
      <Spinner color="#33EEAA" {...args} />
    </>
  )
}

export const Sizes: Story = {
  args: {
    color: 'primary',
    speed: '0.5s',
    thickness: '2px'
  },
  render: args => (
    <>
      <Spinner size="xs" {...args} />
      <Spinner {...args} />
      <Spinner size="md" {...args} />
      <Spinner size="lg" {...args} />
    </>
  )
}

export const Speed: Story = {
  args: {
    color: 'primary',
    size: 'sm',
    thickness: '2px'
  },
  render: args => (
    <>
      <Spinner speed="2s" {...args} />
      <Spinner speed="1s" {...args} />
      <Spinner speed="0.5s" {...args} />
      <Spinner speed="0.3s" {...args} />
    </>
  )
}
