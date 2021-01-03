import { useState, useEffect, createContext, useLayoutEffect } from 'react'

export type Themes = 'light' | 'dark'
const themes = ['light', 'dark']

const isPreferredColorDark = () => {
  if (typeof window !== undefined) {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
  }
  return false
}

const defaultTheme = isPreferredColorDark ? 'dark' : 'light'

const getLocalStorageTheme = () => {
  try {
    const localTheme = localStorage && localStorage.getItem('theme') as Themes
    if (localTheme && themes.includes(localTheme)) {
      return localTheme
    }
  } catch (error) {
    console.warn('Can’t access local storage:', error.message)
  }
}

export const setLocalStorageTheme = (theme: Themes) => {
  try {
    localStorage && localStorage.setItem('theme', theme)
  } catch (error) {
    console.warn('Can’t write to local storage:', error.message)
  }
}

export const getTheme = (): Themes => {
  const currentTheme = getLocalStorageTheme()
  if (currentTheme) {
    return currentTheme
  }
  return defaultTheme
}

export const ThemeContext = createContext<{ theme: Themes; toggleTheme: () => void }>(
  {} as any
)

export function useTheme() {
  const [theme, setTheme] = useState<Themes>(getLocalStorageTheme() || defaultTheme)
  
  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    setLocalStorageTheme(theme as Themes)
  }, [theme])
  
  return { theme, setTheme }
}