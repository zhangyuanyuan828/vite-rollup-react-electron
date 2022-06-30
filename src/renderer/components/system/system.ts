export const COMPONENT_SIZES = ['small', 'medium', 'large'] as const

export type ComponentSize = typeof COMPONENT_SIZES[number]
