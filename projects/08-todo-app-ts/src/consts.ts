export const TODOS_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const

export const FILTERS_BUTTONS = {
  [TODOS_FILTERS.ALL]: {
    literal: 'Todos',
    href: `/?filter=${TODOS_FILTERS.ALL}`
  },
  [TODOS_FILTERS.ACTIVE]: {
    literal: 'Activos',
    href: `/?filter=${TODOS_FILTERS.ACTIVE}`
  },
  [TODOS_FILTERS.COMPLETED]: {
    literal: 'Completados',
    href: `/?filter=${TODOS_FILTERS.COMPLETED}`
  }
} as const
