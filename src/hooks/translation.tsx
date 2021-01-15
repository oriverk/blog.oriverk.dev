import { useRouter } from 'next/router'

import literal from '../i18n'

type InterpolationProps = {
  text?: string,
  query?: {},
  config?: {
    interpolation: {
      prefix: string
      suffix: string
    }
  }
}

function doInterpolation(text: string, query: {}) {
  // text is already translated for locale
  if (!text || !query) { return text || '' }

  const prefix = '{'
  const suffix = '}'

  return Object.keys(query).reduce((all, key) => {
    const regex = new RegExp(
      `${prefix}\s*${key}\s*${suffix}`,
      'gm'
    )
    all = all.replace(regex, `${query[key]}`)
    return all
  }, text)
}

export function useTranslation(key: string, args?: {}) {
  const { locale } = useRouter()
  const lang = locale.split('-')[0]
  // return useMemo(() => {
  if (!literal[key]) {
    throw new Error(
      `translation (key: ${key}, locale: ${locale}) is not found.`
    );
  }
  if (!literal[key][lang]) {
    throw new Error(
      `translation (key: ${key}, locale: ${locale}) is not found.`
    );
  }

  const translated = literal[key][lang] // 'updated at {updated}'
  const interpolated = doInterpolation(translated, args) // 'updated at 2020年5月11日'
  return interpolated
  // }, [key, locale, JSON.stringify(args)]);
}