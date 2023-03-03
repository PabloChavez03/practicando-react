import './App.css'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Router from './Router'
import Page404 from './pages/404'

const routes = [{
  path: '/',
  Component: HomePage
}, {
  path: '/about',
  Component: About
}]

function App () {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} />
    </main>
  )
}

export default App