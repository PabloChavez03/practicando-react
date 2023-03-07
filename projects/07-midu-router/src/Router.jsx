import { useLocation } from './hooks/useLocation'
import { match } from 'path-to-regexp'
import { Children } from 'react'

function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const { currentLocation } = useLocation()
  let routeParams = {}

  const routesFromChildren = Children.map(children, ({ type, props }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find((route) => {
    if (route.path === currentLocation) return true

    const matchedUrl = match(route.path, { decode: decodeURIComponent })
    const matched = matchedUrl(currentLocation)

    if (!matched) return false

    routeParams = matched.params
    return true
  })?.Element

  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent />
}

export default Router
