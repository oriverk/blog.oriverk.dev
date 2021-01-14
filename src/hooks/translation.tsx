import { useMemo } from 'react'
import { useRouter } from 'next/router'

import i18n from '../i18n'

export function useTranslation(key: string, args: string | any = {}): string {
  const { locale } = useRouter()
  const lang = locale.split('-')
  // try {
  //   return i18n[key][lang]
  // } catch (error) {
  //   if (i18n[key]) {
  //     console.log('Translations for any locale are not found. ', error.message)
  //   } else if (i18n[key][lang]) {
  //     console.log(`Translation fro ${locale} is not found. `, error.message)
  //   }
  // }

  return useMemo(() => {
    if (!i18n[key])
      throw new Error(
        `translation (key: ${key}, locale: ${locale}) is not found.`
      );
    if (!i18n[key][lang])
      throw new Error(
        `translation (key: ${key}, locale: ${locale}) is not found.`
      );

    return i18n[key][lang]
  }, [key, locale, JSON.stringify(args)]);
}