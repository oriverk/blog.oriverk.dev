import { useEffect } from 'react'
import { useRouter } from 'next/router'
import i18nConfig from '../../i18n.config'
const { locales, defaultLocale } = i18nConfig
const configLangs = locales.map((locale) => { return locale.split('-')[0] }) || defaultLocale

function getNextLocale(currentLocale: string, locales: string[]): string {
  // when locales = [a, b, c], newLocale changes b -> c -> a -> b -> ...
  const indexOfLocale = locales.indexOf(currentLocale)
  return locales[(indexOfLocale + 1) % locales.length]
}

const LocaleProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const { asPath, locale } = router

  useEffect(() => {
    const getItem = localStorage.getItem('locale')
    if (!configLangs.includes(getItem)) {
      localStorage.setItem('locale', locale)
    } else if (getItem !== locale) {
      router.push(asPath, asPath, {locale: getItem})
    }
  }, [])
  
  return (
    <>
      {children}
    </>
  )
}

export { LocaleProvider, getNextLocale }