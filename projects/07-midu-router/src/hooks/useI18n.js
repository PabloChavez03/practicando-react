const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: 'Una pequeña descripción',
    button: 'Ir a Home'
  },
  en: {
    title: 'About us',
    description: 'Little description',
    button: 'Go to Home'
  }
}

export function useI18n ({ lang }) {
  return i18n[lang] || i18n.es
}
