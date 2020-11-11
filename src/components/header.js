import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { rhythm, scale } from "../utils/typography"

class Header extends React.Component {
  render() {
    const { location, title } = this.props
    let header

    if (!location.pathname.includes("/post/")) {
      header = (
        <h1
          className="header__title"
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
          }}
        >
          {title}
        </h1>
      )
    } else {
      header = (
        <h2 className="header__title header__title--condensed">
          <span>&#10094;</span> {title}
        </h2>
      )
    }

    return (
      <StaticQuery
        query={headerQuery}
        render={data => {
          return (
            <header className="header">
              <Link to={`/`} className="header__link">
                {!location.pathname.includes("/post/") && (
                  <Image
                    className="header__logo"
                    fixed={data.avatar.childImageSharp.fixed}
                    alt={title}
                  />
                )}
                {header}
              </Link>
            </header>
          )
        }}
      />
    )
  }
}

const headerQuery = graphql`
  query HeaderQuery {
    avatar: file(absolutePath: { regex: "/reverblogo.png/" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default Header
