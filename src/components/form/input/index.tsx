import React from 'react'
import { Theme, useTheme } from '@emotion/react'
import { css, CSSObject, cx } from '@emotion/css'
import { getValidChildren } from '../../../utils/react'
import { getColor } from '../../../utils/theme'
import { ThemeColor } from '../../../shared/theme/theme.types'
import { CommonElementSize, HTMLProps } from '../../../types'
import Box, { BoxProps } from '../../layout/box'
import { omit } from '../../../utils'
import themingProps from '../../../constants/themingProps'
import useAwesomeStyles from '../../../shared/theme/useAwesomeStyles'
import Label, { LabelProps } from '../../data/label'

export type InputVariant = 'outlined' | 'filled' | 'underlined' | 'minimum'

export interface ThemeInputProps {
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  color?: ThemeColor
  rounded?: boolean
  error?: boolean
  variant?: InputVariant
  size?: CommonElementSize
}

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & ThemeInputProps

export interface InputGroupProps extends HTMLProps<HTMLDivElement> {
  color?: ThemeColor
}

export interface FeedbackProps extends HTMLProps<HTMLDivElement> {
  error?: boolean
  color?: ThemeColor
  message: string
}

export interface InputBoxProps extends BoxProps, Partial<LabelProps> {
  feedbackProps?: FeedbackProps
}

export interface InputAddonProps extends HTMLProps<HTMLDivElement> {
  addon: React.ReactNode
}

export interface InputExtensionProps extends HTMLProps<HTMLDivElement> {
  extension: React.ReactNode
}

const addonCommonCss = (theme: Theme) => css`
  font-size: 16px;
  padding: 6px 16px;
  line-height: 18px;
  border: 1px solid ${theme.palette.colors.text.light.secondary};
  background-color: ${theme.palette.colors.text.light.secondary};
  color: ${theme.palette.colors.text.dark.primary};
`

const InputLeftAddon: React.FC<InputAddonProps> = ({ children, className, addon, ...rest }) => {
  const theme = useTheme()
  const styles = css`
    ${addonCommonCss(theme)}
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  `

  return (
    <div className={cx(styles, className)} {...rest}>
      {addon}
    </div>
  )
}

const InputRightAddon: React.FC<InputAddonProps> = ({ children, className, addon, ...rest }) => {
  const theme = useTheme()
  const styles = css`
    ${addonCommonCss(theme)}
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  `

  return (
    <div className={cx(styles, className)} {...rest}>
      {addon}
    </div>
  )
}

const commonExtensionCss = (theme: Theme) => css`
  position: absolute;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  svg {
    max-width: 32px;
    height: 18px;
    color: ${theme.palette.colors.text.light.secondary};
  }
`

const InputLeftExtension: React.FC<InputExtensionProps> = ({
  children,
  className,
  extension,
  ...rest
}) => {
  const theme = useTheme()
  const _css = css`
    ${commonExtensionCss(theme)}
    left: 10px;
  `
  return (
    <div className={cx(_css, className)} {...rest}>
      {extension}
    </div>
  )
}

const InputRightExtension: React.FC<InputExtensionProps> = ({
  children,
  className,
  extension,
  ...rest
}) => {
  const theme = useTheme()
  const _css = css`
    ${commonExtensionCss(theme)}
    right: 10px;
  `

  return (
    <div className={cx(_css, className)} {...rest}>
      {extension}
    </div>
  )
}

const Feedback: React.FC<FeedbackProps> = props => {
  const theme = useTheme()
  const _css = css`
    color: ${props.error ? theme.palette.error['500'] : getColor(props.color || 'success', 500)};
  `
  return <label className={cx(_css, props.className)}>{props.message}</label>
}

const Input: React.FC<InputProps> = props => {
  const { children, className, ...otherProps } = props
  const { styles } = useAwesomeStyles(otherProps, 'input')

  return (
    <input className={cx(...styles.main, className)} {...omit(otherProps, themingProps.input)} />
  )
}

const InputGroup: React.FC<InputGroupProps> = ({ children, className, ...rest }) => {
  const _css = css`
    display: flex;
    align-items: center;
    position: relative;
  `

  let inputStyles: CSSObject = {}
  const validChildren = getValidChildren(children)
  let inputIdx = -1
  validChildren.forEach((child, index) => {
    if (child.type === InputLeftAddon) {
      inputStyles = { ...inputStyles, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
    } else if (child.type === InputRightAddon) {
      inputStyles = { ...inputStyles, borderTopRightRadius: 0, borderBottomRightRadius: 0 }
    } else if (child.type === InputLeftExtension) {
      inputStyles = { ...inputStyles, paddingLeft: 47 }
    } else if (child.type === InputRightExtension) {
      inputStyles = { ...inputStyles, paddingRight: 47 }
    } else if (child.type === Input) {
      inputIdx = index
    }
  })

  if (inputIdx >= 0) {
    validChildren[inputIdx] = React.cloneElement(validChildren[inputIdx], {
      className: css(inputStyles)
    })
  }

  return (
    <div className={cx(_css, className)} {...rest}>
      {validChildren}
    </div>
  )
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  spacing,
  direction,
  feedbackProps,
  className,
  children,
  ...rest
}) => {
  const theme = useTheme()
  const color = feedbackProps?.error
    ? theme.palette.error
    : getColor(feedbackProps?.color || 'primary')

  const boxCss = css`
    display: flex;
    flex-direction: ${direction};
    input {
      ~ .feedback {
        opacity: 0;
        transition: all 0.1s;
      }
    }

    input:focus {
      border-color: ${color[400]};
    }

    input:active {
      border-color: ${color[500]};
    }

    input:focus,
    input:active {
      ~ .feedback {
        opacity: 1;
        display: inline-block;
        color: ${color[500]};
        padding-left: 2px;
        padding-top: 2px;
      }
    }
  `

  return (
    <Box className={cx(boxCss, className)} {...rest}>
      {label && <Label label={label} spacing={spacing} direction={direction} />}
      <div
        className={cx(css`
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
        `)}
      >
        {children}
        {feedbackProps && <Feedback {...feedbackProps} className='feedback' />}
      </div>
    </Box>
  )
}

export default Input
export {
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftExtension,
  InputRightExtension,
  InputBox,
  Feedback
}
