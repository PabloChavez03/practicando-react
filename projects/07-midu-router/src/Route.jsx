import { useLocation } from './hooks/useLocation'

function Route ({ element, path, ...props }) {
  const { currentLocation } = useLocation()

  if (currentLocation === path) {
    return element
  }
}

export default Route
