import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Meta, Story } from '@storybook/react'
import React from 'react'

import { defaultButtonOptions } from '../../../shared/theme/themeEngine/componentStyles/button'
import { BrandColor, CommonSize } from '../../../types'
import Button, { ButtonProps, ButtonVariant } from '.'

export default {
  title: 'Awesome UI/Form/Button',
  component: Button,
  argTypes: {
    color: {
      table: {
        category: 'Color'
      },
      control: { type: 'inline-radio' },
      defaultValue: defaultButtonOptions.default.color
    },
    variant: {
      control: { type: 'inline-radio' },
      defaultValue: defaultButtonOptions.default.variant
    },
    size: {
      control: { type: 'inline-radio' },
      defaultValue: defaultButtonOptions.default.size
    },
    rounded: {
      defaultValue: defaultButtonOptions.default.rounded
    },
    loading: {
      defaultValue: defaultButtonOptions.default.loading
    }
  }
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args} />

//
// export const Primary = Template.bind({})
// Primary.args = {
//   variant: 'primary',
//   label: 'Button'
// }
//
// export const Secondary = Template.bind({})
// Secondary.args = {
//   variant: 'secondary',
//   label: 'Button'
// }
//
// export const Large = Template.bind({})
// Large.args = {
//   variant: 'blabal',
//   size: 'large',
//   label: 'Button'
// }
//
// export const Small = Template.bind({})
// Small.args = {
//   size: 'small',
//   label: 'Button'
// }

const buttonColors: BrandColor[] = [
  'primary',
  'secondary',
  'tertiary',
  'error',
  'warning',
  'info',
  'success'
]
const buttonVariants: ButtonVariant[] = ['solid', 'outline', 'link', 'ghost']
const buttonSizes: CommonSize[] = ['xs', 'sm', 'md', 'lg']
const buttonShapes = [true, false]

const capitalize = inputString => `${inputString[0].toUpperCase()}${inputString.substring(1)}`

export const ColorScheme = ({ ...args }) => (
  <>
    {buttonColors.map(color => (
      <Button key={color} {...args} color={color}>
        {capitalize(color)}
      </Button>
    ))}
  </>
)

export const variants = ({ ...args }) => (
  <>
    {buttonVariants.map(variant => (
      <div key={variant} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}> {capitalize(variant)} </h3>
        {buttonColors.map(color => (
          <Button key={`${variant}-${color}`} {...args} color={color} variant={variant}>
            {capitalize(color)}
          </Button>
        ))}
      </div>
    ))}
  </>
)

export const sizes = ({ ...args }) => (
  <>
    {buttonSizes.map(size => (
      <div key={size} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}>{size}</h3>
        {buttonColors.map(color => (
          <Button key={`${color}-${size}`} {...args} color={color} variant='solid' size={size}>
            {capitalize(color)}
          </Button>
        ))}
      </div>
    ))}
  </>
)

export const shapes = ({ ...args }) => (
  <>
    {buttonShapes.map(shape => (
      <div key={shape ? 'rounded' : 'square'} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}> {shape ? 'Rounded' : 'Square'} </h3>
        {buttonColors.map(color => (
          <Button key={`${color}-${shape}`} {...args} color={color} variant='solid' rounded={shape}>
            {capitalize(color)}
          </Button>
        ))}
      </div>
    ))}
  </>
)

export const all = ({ ...args }) => (
  <>
    {buttonSizes.map(size => (
      <div key={size} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}> {size} </h3>
        {buttonVariants.map(variant => (
          <div key={`${size}-${variant}`} style={{ padding: 20 }}>
            <h4 style={{ paddingBottom: 10, display: 'inline-block', minWidth: 80 }}>
              {capitalize(variant)}
            </h4>
            {buttonColors.map(color => (
              <Button
                key={`${variant}-${color}-${size}-rounded`}
                {...args}
                color={color}
                variant={variant}
                size={size}
              >
                {capitalize(color)}
              </Button>
            ))}
            {buttonColors.map(color => (
              <Button
                key={`${variant}-${color}-${size}-square`}
                {...args}
                color={color}
                variant={variant}
                size={size}
                rounded={false}
              >
                {capitalize(color)}
              </Button>
            ))}
          </div>
        ))}
      </div>
    ))}
  </>
)

export const loading = ({ ...args }) => (
  <>
    <Button loading> Loading Button </Button>
    <Button loading spinner={{ placement: 'right' }}>
      Loading Button
    </Button>
  </>
)

export const icon = ({ ...args }) => (
  <>
    <Button
      {...args}
      icon={{
        element: <FontAwesomeIcon icon={faCoffee} />
      }}
    >
      Coffee Mug
    </Button>
    <Button
      {...args}
      icon={{
        placement: 'right',
        element: <FontAwesomeIcon icon={faCoffee} />
      }}
    >
      Coffee Mug
    </Button>
  </>
)
