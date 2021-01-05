import { useState, useEffect, createContext, useContext } from 'react'

type Themes = 'light' | 'dark'
const themeModes = ['light', 'dark']
const defaultTheme = themeModes[1] as Themes

type ContextProps = {
  theme: Themes,
  toggleTheme: (currentTheme: Themes) => void
}

const ThemeContext = createContext<Partial<ContextProps>>({})

const getLocalTheme = () => {
  try {
    const localTheme = localStorage && localStorage.getItem('theme')
    if (localTheme && themeModes.includes(localTheme)) {
      return localTheme as Themes
    }
  } catch (error) {
    console.warn("Can't access local storage: ", error.message)
  }
}

const getTheme = ():Themes => {
  const localTheme = getLocalTheme()
  if (localTheme) {
    return localTheme
  } else {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const browserTheme = isDark ? 'dark' : 'light'
    return browserTheme
  }
}

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes | null>(null)

  function toggleTheme(currentTheme: Themes) {
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