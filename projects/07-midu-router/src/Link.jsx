import { EVENTS } from './constants'

function navigate (href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

function Link ({ target, to, ...props }) {
  function handleClick (evt) {
    const isMainEvent = evt.button === 0 // primary key or left click
    const isModifiedEvent = evt.metaKey || evt.ctrlKey || evt.altKey || evt.shift
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      evt.preventDefault()
      navigate(to)
    }
  }

  return <a onClick={handleClick} href={to} target={target} {...props} />
}

export default Link
