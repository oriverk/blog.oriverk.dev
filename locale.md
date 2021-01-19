## definition
value = initValue of useState
setLocale = from useState
locale = from next/router
getItem = localStorage.getItem('locale')

## if
- if !value && !getItem means 完全初回
  - setLocale(locale)
  - setItem('locale', locale)

- if !value && getItem && (getItem === locale)
  - do nothing
- if !value && getItem && (getItem !== locale)
  - setLocale(getItem)
  - router.push(getItem)
- if value && (getItem && getItem === locale)
  - do nothing
- if value && (getItem && getItem !== locale)
  - setItem(nextLocale)
  - setLocale(nextLocale)
  - router.push(nextLocale)