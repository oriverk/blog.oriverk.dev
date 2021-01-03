import { Themes } from '../pages/_app'

const themes = ['light', 'dark']

const isPreferredColorDark = () => {
  return window.matchMedia('(prefers-color-scheme: dark)')
}

const getBrowserTheme = () => {
  const isDark = isPreferredColorDark()
  return isDark && isDark.matches ? 'dark' : 'light'
}

const getLocalStorageTheme = () => {
  try {
    const localTheme = localStorage && localStorage.getItem('theme')
    if (localTheme && themes.includes(localTheme)) {
      return localTheme
    }
  } catch (err) {
    console.warn('Can’t access local storage:', err.message)
  }
}

export const setLocalStorageTheme = (theme: Themes) => {
  try {
    localStorage && localStorage.setItem('theme', theme)
  } catch (err) {
    console.warn('Can’t write to local storage:', err.message)
  }
}

export const getTheme = () => {
  const currentTheme = getLocalStorageTheme()
  if (currentTheme) {
    return currentTheme
  }

  const browserTheme = getBrowserTheme()
  setLocalStorageTheme(browserTheme)
  return browserTheme
}
