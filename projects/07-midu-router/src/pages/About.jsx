import Link from '../Link'
import { useI18n } from '../hooks/useI18n'

export default function About ({ routeParams }) {
  const i18n = useI18n({ lang: routeParams.lang })
  console.log(i18n)
  return (
    <>
      <h1>{i18n.title}</h1>
      <p>{i18n.description}</p>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
