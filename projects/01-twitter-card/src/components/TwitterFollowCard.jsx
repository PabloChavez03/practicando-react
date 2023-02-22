import React, { useState } from 'react'

function TwitterFollowCard ({ userName, name, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const text = isFollowing ? 'Siguiendo' : 'Seguir'
  const buttonClassName = isFollowing
    ? 'tw-follow-card-aside-button is-following'
    : 'tw-follow-card-aside-button'

  const imgSrc = `https://unavatar.io/${userName}`

  function handleClick () {
    isFollowing ? setIsFollowing(false) : setIsFollowing(true)
  }

  return (
    <article className='tw-follow-card'>
      <header className='tw-follow-card-header'>
        <img
          className='tw-follow-card-img'
          src={imgSrc}
          alt='Avatar de chavezpablo_'
        />
        <div className='tw-follow-card-div'>
          <strong>{name}</strong>
          <span>@{userName}</span>
        </div>
      </header>
      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          <span className='tw-follow-card-text'>{text}</span>
          <span className='tw-follow-card-stopFollowing'>Dejar de seguir</span>
        </button>
      </aside>
    </article>
  )
}

export default TwitterFollowCard
