import { lazy, Suspense } from 'react'
import './App.css'
import Loading from './Loading'
import Page404 from './pages/404'
import Route from './Route'
import Router from './Router'

const LazyHomePage = lazy(() => import('./pages/HomePage'))
const LazyAboutPage = lazy(() => import('./pages/About'))
const LazySearchPage = lazy(() => import('./pages/SearchPage'))

const appRoutes = [{
  path: '/search/:query',
  Element: LazySearchPage
},
{
  path: '/:lang/about',
  Element: LazyAboutPage
}]

function App () {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Element={LazyHomePage} />
          <Route path='/about' Element={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
