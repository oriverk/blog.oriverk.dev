import { useState, useEffect, createContext, useContext } from 'react'

const themeModes = ['light', 'dark']
const defaultTheme = themeModes[1]

const ThemeContext = createContext({
  theme: '',
  toggleTheme: () => {}
})

const getLocalTheme = () => {
  try {
    const localTheme = localStorage && localStorage.getItem('theme')
    if (localTheme && themeModes.includes(localTheme)) {
      return localTheme
    }
  } catch (error) {
    console.warn("Can't access local storage: ", error.message)
  }
}

const getTheme = () => {
  const localTheme = getLocalTheme()
  if (localTheme) {
    return localTheme
  } else {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const browserTheme = isDark ? 'dark' : 'light'
    return browserTheme
  }
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null)

  function toggleTheme(currentTheme) {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  useEffect(() => {
    if (!theme) {
      const initial = getTheme() || defaultTheme
      setTheme(initial)
      localStorage.setItem('theme', initial)
      document.body.setAttribute('data-theme', initial)
      return
    }
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      {children}
    </ThemeContext.Provider>
  )
}

const useThemeContext = () => useContext(ThemeContext)

export { ThemeProvider, useThemeContext, themeModes }