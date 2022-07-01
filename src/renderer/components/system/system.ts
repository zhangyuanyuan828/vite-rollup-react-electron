export const COMPONENT_SIZES = ['small', 'default', 'large'] as const

export type ComponentSize = typeof COMPONENT_SIZES[number]
