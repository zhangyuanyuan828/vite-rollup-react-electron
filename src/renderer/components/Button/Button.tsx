import classNames from 'classnames'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { ComponentSize, COMPONENT_SIZES } from '../system'
import './Button.css'

export const BUTTON_COLOR_THEMES = ['blue', 'green', 'pink', 'purple', 'red', 'teal', 'yellow'] as const

export type ButtonColorTheme = typeof BUTTON_COLOR_THEMES[number]

export const BUTTON_VARIANTS = ['ghost', 'link'] as const

export type ButtonVariant = typeof BUTTON_VARIANTS[number]

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  block?: boolean

  colorTheme?: ButtonColorTheme

  loading?: boolean

  round?: boolean

  size?: ComponentSize

  variant?: ButtonVariant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { block, children, className, colorTheme, disabled, loading, round, size, ...buttonProps } = props
  return (
    <button
      ref={ref}
      {...buttonProps}
      className={classNames(
        'l-btn',
        {
          'l-btn-block': block,
          'l-btn-round': round,
          ['l-btn-' + size]: size,
          ['l-btn-' + colorTheme]: colorTheme
        },
        className
      )}
      disabled={disabled || loading}>
      <span>{children}</span>
    </button>
  )
})

Button.propTypes = {
  block: PropTypes.bool,
  colorTheme: PropTypes.oneOf(BUTTON_COLOR_THEMES),
  loading: PropTypes.bool,
  round: PropTypes.bool,
  size: PropTypes.oneOf(COMPONENT_SIZES),
  variant: PropTypes.oneOf(BUTTON_VARIANTS)
}
