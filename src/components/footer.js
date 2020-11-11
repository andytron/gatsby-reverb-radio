import React from "react"
import { Link } from "gatsby"

const Footer = ({ location }) => {
  return (
    <footer className="footer">
      {location.pathname.includes("/post/") && (
        <div className="footer__icon">&#10086;</div>
      )}
      -{" "}
      <Link to="/" className="footer__link">
        ( ( ( REVERBERATION ) ) )
      </Link>{" "}
      -
      <div className="footer__copyright">
        © {new Date().getFullYear()},{` `}
        <a href="https://tikirocket.com">Tiki Rocket</a>
      </div>
    </footer>
  )
}

export default Footer
