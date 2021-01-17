import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

type Locales = 'en' | 'ja'
type ContextProps = {
  toggleLocale: (currentLocale: string) => void
}

const LocaleContext = createContext<Partial<ContextProps>>({})

const LocaleProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const { asPath, locale, locales, defaultLocale } = router
  const [value, setLocale] = useState<Locales>(locale as Locales)
  
  function getNextLocale(currentLocale: string) {
    // when locales = [a, b, c], newLocale changes b -> c -> a -> b -> ...
    if (locales.indexOf(currentLocale) === -1) {
      return locale as Locales || defaultLocale as Locales
    }
    const indexOfLocale = locales.indexOf(currentLocale)
    return locales[(indexOfLocale + 1) % locales.length] as Locales
  }

  function toggleLocale(currentLocale: string) {
    const nextLocale = getNextLocale(currentLocale)
    if (locale !== nextLocale) {
      setLocale(nextLocale)
    }
  }

  useEffect(() => {
    if (!localStorage || localStorage.getItem('locale') === null) {
      localStorage.setItem('locale', locale)
      console.dir(router)
      router.push(asPath, asPath, { locale: locale })
      return
    }
    localStorage.setItem('locale', value)
    try {
      router.push(asPath, asPath, { locale: value })
      
    } catch (error) {
      console.log(error.message)
    }
  }, [value])
  
  return (
    <LocaleContext.Provider value={{ toggleLocale } as ContextProps}>
      {children}
    </LocaleContext.Provider>
  )
}

const useLocaleContext = () => useContext(LocaleContext)

export { LocaleProvider, useLocaleContext }