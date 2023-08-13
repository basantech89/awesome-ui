import { getSpacing } from '../../../../utils/theme'
import { ComponentConfigGenerator, DefaultThemeOptions } from './index'
import { ThemeSpinnerProps } from '../../../../components/feedback/spinner'
import { Sizing } from '../../theme.types'
import { DeepRequired } from '../../../../utils'
import { css } from '@compiled/react'

export const defaultSpinnerThemeOptions: DefaultThemeOptions<
  DeepRequired<ThemeSpinnerProps>,
  { sizing: Sizing }
> = {
  default: {
    color: 'primary',
    speed: '0.5s',
    size: 'sm',
    thickness: '2px'
  },
  xStyles: {
    display: 'inline-block',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRadius: '50%'
  },
  sizing: {
    xs: '16px',
    sm: '24px',
    md: '28px',
    lg: '36px'
  }
}

const generateSpinnerConfig: ComponentConfigGenerator['spinner'] = (
  props,
  options,
  theme
) => {
  const { size, color, speed, thickness } = props
  const spinnerSize = getSpacing(size, theme.spacing.compute, options.sizing)
  const borderColor = theme.palette.getColor(color)

  const styles = css`
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    width: ${spinnerSize};
    height: ${spinnerSize};
    border-top-color: ${borderColor};
    border-right-color: ${borderColor};
    animation: ${`spin ${speed} linear infinite`};
    display: inline-block;
    border-radius: 50%;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-width: ${thickness};
    border-style: solid;
  `

  return {
    ...props,
    astyles: styles,
    spinnerSize,
    borderColor,
    xStyles: styles
  }
}

export default generateSpinnerConfig
