import classNames from 'classnames'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { ComponentSize, COMPONENT_SIZES } from '../system'

export const BUTTON_COLOR_THEMES = ['red', 'yellow', 'pink'] as const

export type ButtonColorTheme = typeof BUTTON_COLOR_THEMES[number]

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean

  colorTheme?: ButtonColorTheme

  size?: ComponentSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { block, colorTheme, size, className, ...buttonProps } = props
  return <button ref={ref} {...buttonProps} className={classNames(className)}></button>
})

Button.propTypes = {
  block: PropTypes.bool,
  colorTheme: PropTypes.oneOf(BUTTON_COLOR_THEMES),
  size: PropTypes.oneOf(COMPONENT_SIZES)
}

Button.defaultProps = {
  block: false,
  size: 'medium'
}
