import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light' | 'high-contrast'

export interface ThemeContextValue {
  theme: Theme,

  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme() {}
})

export const ThemeProvider = ThemeContext.Provider

export function useTheme() {
  return useContext(ThemeContext)
}
