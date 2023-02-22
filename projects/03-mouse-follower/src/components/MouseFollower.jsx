import React, { useState, useEffect } from 'react'

function MouseFollower () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (evt) => {
      const { clientX, clientY } = evt
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // clean up
    // --> cuando el componente se desmonta
    // --> cuando cambian las dependecias, antes de ejecutar el efecto de nuevof
    return () => {
      console.log('clean up')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#39f',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          borderRadius: 20,
          opacity: `${enabled ? 0.8 : 0.3}`,
          pointerEvents: 'none',
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar seguir puntero' : 'Activar seguir puntero'}
      </button>
    </>
  )
}

export default MouseFollower
