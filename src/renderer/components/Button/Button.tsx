import classNames from 'classnames'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { ComponentSize, COMPONENT_SIZES } from '../system'
import './Button.css'

export const BUTTON_COLOR_THEMES = [
  'amber',
  'blue',
  'cyan',
  'emerald',
  'fuchsia',
  'gray',
  'green',
  'indigo',
  'lime',
  'neutral',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'sky',
  'slate',
  'stone',
  'teal',
  'violet',
  'yellow',
  'zinc'
] as const

export type ButtonColorTheme = typeof BUTTON_COLOR_THEMES[number]

export const BUTTON_VARIANTS = ['ghost', 'link', 'outline'] as const

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
  const { block, children, className, colorTheme, disabled, loading, round, size, variant, ...buttonProps } = props
  return (
    <button
      ref={ref}
      {...buttonProps}
      className={classNames(
        'l-btn',
        {
          'l-btn-block': block,
          'l-btn-round': round,
          ['l-btn-size-' + size]: size,
          ['l-btn-color-' + colorTheme]: colorTheme,
          ['l-btn-variant-' + variant]: variant
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
