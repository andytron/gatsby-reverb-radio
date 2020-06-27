import React, { useState, useEffect } from 'react'

const ScrollTopArrow = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showArrow && window.pageYOffset > 400) {
        setShowArrow(true)
      } else if (showArrow && window.pageYOffset <= 400) {
        setShowArrow(false)
      }
    }

    window.addEventListener('scroll', checkScrollTop)

    return () => {
      window.removeEventListener('scroll', checkScrollTop)
    }
  }, [showArrow])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className="icon__scroll-arrow"
      onClick={scrollToTop}
      style={{
        display: showArrow ? 'flex' : 'none'
      }}
    >
      <span>&#8613;</span>
    </div>
  )
}

export default ScrollTopArrow
