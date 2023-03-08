import { type FilterValue } from '../types'
import { FILTERS_BUTTONS } from '../consts'

interface Props {
  onFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange
}) => {
  return (
    <ul className='filters'>
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = key === filterSelected
          const className = isSelected ? 'selected' : ''

          return (
            <li key={key}>
              <a
                href={href} className={className} onClick={(evt) => {
                  evt.preventDefault()
                  onFilterChange(key as FilterValue)
                }}
              >{literal}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
