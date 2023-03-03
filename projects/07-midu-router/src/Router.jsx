import { useLocation } from './hooks/useLocation'

function Router ({ routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
  const { currentLocation } = useLocation()

  const Page = routes.find((route) => route.path === currentLocation)?.Component

  return Page ? <Page /> : <DefaultComponent />
}

export default Router
