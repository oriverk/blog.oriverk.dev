import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

// import i18n from '../../i18n.config'

type Locales = 'en' | 'ja'
type ContextProps = {
  currentLocale: Locales,
  nextLocale: Locales,
  locale: Locales,
  toggleLocale: (currentLocale: Locales) => void
}

const LocaleContext = createContext<Partial<ContextProps>>({})

const LocaleProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const { pathname, locale, locales, defaultLocale } = router
  
  const currentLocale = locale as Locales

  function getNextLocale(currentLocale: Locales) {
    const indexOfLocale = locales.indexOf(currentLocale)
    // when locales = [a, b, c], newLocale changes b -> c -> a -> b -> ...
    return locales[(indexOfLocale + 1) % locales.length] as Locales
  }

  const nextLocale = getNextLocale(currentLocale)

  const [value, setLocale] = useState<Locales>(null)

  function toggleLocale(currentLocale: Locales) {
    const nextLocale = getNextLocale(currentLocale)
    console.log(`locale: ${locale}, currentLocale: ${currentLocale}, newLocale: ${nextLocale}`)
    if (locale !== nextLocale) {
      setLocale(nextLocale)
    }
  }

  useEffect(() => {
    if (!localStorage || localStorage.getItem('locale') === null) {
      localStorage.setItem('locale', locale)
      return
    }
    localStorage.setItem('locale', value)
    router.push(pathname, pathname, { locale: value })
  }, [value])
  
  return (
    <LocaleContext.Provider value={{ locale, currentLocale, nextLocale, toggleLocale } as ContextProps}>
      {children}
    </LocaleContext.Provider>
  )
}

const useLocaleContext = () => useContext(LocaleContext)

export { LocaleProvider, useLocaleContext }