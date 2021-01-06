import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

type Locales = 'en' | 'ja'
type ContextProps = {
  locale: Locales,
  toggleLocale: (currentLocale: Locales) => void
}

const LocaleContext = createContext<Partial<ContextProps>>({})

const LocaleProvider: React.FC = ({ children }) => {
  const [value, setLocale] = useState<Locales | null>(null)

  const router = useRouter()
  const { pathname, locale, locales } = router
  
  function toggleLocale(currentLocale: Locales) {
    const indexOfLocale = locales.indexOf(currentLocale)
    const newLocale = locales[(indexOfLocale + 1) % locales.length] as Locales
    setLocale(newLocale)
  }

  useEffect(() => {
    if (localStorage.getItem('locale') === null) {
      localStorage.setItem('locale', locale)
      return
    }
    localStorage.setItem('locale', value)
    router.push(pathname, pathname, { locale: value })
  }, [value])
  
  return (
    <LocaleContext.Provider value={{ locale, toggleLocale } as ContextProps}>
      {children}
    </LocaleContext.Provider>
  )
}

const useLocaleContext = () => useContext(LocaleContext)

export { LocaleProvider, useLocaleContext }