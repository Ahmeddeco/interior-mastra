import 'server-only'

const dictionaries = {
  en: () => import('./en').then((module) => module.default),
  ar: () => import('./ar').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'ar') =>
  dictionaries[locale]()