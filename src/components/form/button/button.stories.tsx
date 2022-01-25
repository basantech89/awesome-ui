import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Meta, Story } from '@storybook/react'
import * as React from 'react'
import { BrandColor, CommonElementSize } from '../../../types'

import { getDefaultButtonThemeOptions } from '../../../shared/theme/themeEngine/componentConfig/button'
import Button, { ButtonProps, ButtonVariant } from '.'
import theme from '../../../shared/theme'
import Box from '../../layout/box'
import { css } from '@emotion/css'

const defaultButtonThemeOptions = getDefaultButtonThemeOptions(theme.spacing)

export default {
  title: 'Awesome UI/Form/Button',
  component: Button,
  argTypes: {
    color: {
      control: { type: 'inline-radio' },
      defaultValue: defaultButtonThemeOptions.default.color
    },
    variant: {
      control: { type: 'inline-radio' },
      defaultValue: defaultButtonThemeOptions.default.variant
    },
    size: {
      control: { type: 'inline-radio' },
      defaultValue: defaultButtonThemeOptions.default.size
    },
    rounded: {
      defaultValue: defaultButtonThemeOptions.default.rounded
    },
    loading: {
      defaultValue: defaultButtonThemeOptions.default.loading
    },
    iconPlacement: {
      defaultValue: defaultButtonThemeOptions.default.iconPlacement
    },
    iconSpacing: {
      defaultValue: defaultButtonThemeOptions.default.iconSpacing
    },
    spinnerPlacement: {
      defaultValue: defaultButtonThemeOptions.default.spinnerPlacement
    },
    spinnerSpacing: {
      defaultValue: defaultButtonThemeOptions.default.spinnerSpacing
    }
  }
} as Meta

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
const buttonSizes: CommonElementSize[] = ['xs', 'sm', 'md', 'lg']
const buttonShapes = [true, false]

const capitalize = (inputString: string) =>
  `${inputString[0].toUpperCase()}${inputString.substring(1)}`

const display = 'flex'
const gap = 3
const gapY = 10

export const ColorScheme = ({ ...args }) => (
  <Box d={display} gap={gap}>
    {buttonColors.map(color => (
      <Button key={color} {...args} color={color}>
        {capitalize(color)}
      </Button>
    ))}
  </Box>
)

export const variants = ({ ...args }) => (
  <>
    {buttonVariants.map(variant => (
      <div key={variant} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}> {capitalize(variant)} </h3>
        <Box d={display} gap={gap}>
          {buttonColors.map(color => (
            <Button key={`${variant}-${color}`} {...args} color={color} variant={variant}>
              {capitalize(color)}
            </Button>
          ))}
        </Box>
      </div>
    ))}
  </>
)

export const sizes = ({ ...args }) => (
  <>
    {buttonSizes.map(size => (
      <div key={size} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}>{size}</h3>
        <Box d={display} gap={gap}>
          {buttonColors.map(color => (
            <Button key={`${color}-${size}`} {...args} color={color} variant='solid' size={size}>
              {capitalize(color)}
            </Button>
          ))}
        </Box>
      </div>
    ))}
  </>
)

export const shapes = ({ ...args }) => (
  <>
    {buttonShapes.map(shape => (
      <div key={shape ? 'rounded' : 'square'} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}> {shape ? 'Rounded' : 'Square'} </h3>
        <Box d={display} gap={gap}>
          {buttonColors.map(color => (
            <Button
              key={`${color}-${shape}`}
              {...args}
              color={color}
              variant='solid'
              rounded={shape}
            >
              {capitalize(color)}
            </Button>
          ))}
        </Box>
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
            <Box d={display} gapX={gap} gapY={gapY}>
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
            </Box>
            <Box d={display} gapX={gap} gapY={gapY}>
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
            </Box>
          </div>
        ))}
      </div>
    ))}
  </>
)

export const loading = ({ ...args }) => (
  <Box d={display} gap={3}>
    <Button {...args} loading>
      Loading Button
    </Button>
    <Button {...args} loading spinnerPlacement='right'>
      Loading Button
    </Button>
    <Button {...args} loading loadingText='Loading Text' spinnerPlacement='right'>
      Loading Button
    </Button>
  </Box>
)

export const icon = ({ ...args }) => (
  <Box d={display} gap={gap}>
    <Button {...args} icon={<FontAwesomeIcon icon={faCoffee} />}>
      Coffee Mug
    </Button>
    <Button {...args} icon={<FontAwesomeIcon icon={faCoffee} />} iconPlacement='right'>
      Coffee Mug
    </Button>
  </Box>
)

export const disabled = ({ ...args }) => (
  <>
    {buttonVariants.map(variant => (
      <div key={variant} style={{ padding: 20 }}>
        <h3 style={{ paddingBottom: 10 }}> {capitalize(variant)} </h3>
        <Box d={display} gap={gap}>
          {buttonColors.map(color => (
            <Button key={`${variant}-${color}`} {...args} color={color} variant={variant} disabled>
              {capitalize(color)}
            </Button>
          ))}
        </Box>
      </div>
    ))}
  </>
)

const Template: Story<ButtonProps> = args => <Button {...args} />
export const ClassName = Template.bind({})
ClassName.args = {
  className: css`
    background-color: aqua;
  `,
  children: 'Button'
}
