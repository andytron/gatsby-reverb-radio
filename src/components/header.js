import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
// import styled from "styled-components"
import { rhythm, scale } from "../utils/typography"

class Header extends React.Component {
  render() {
    const { location, title } = this.props
    // const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (!location.pathname.includes("/post/")) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            letterSpacing: "0.2rem",
          }}
        >
          {title}
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            marginTop: 0,
            letterSpacing: "0.1rem",
          }}
        >
          <span style={{ fontSize: "1rem", verticalAlign: "middle" }}>
            &#10094;
          </span>{" "}
          {title}
        </h3>
      )
    }

    return (
      <StaticQuery
        query={headerQuery}
        render={data => {
          return (
            <header
              style={{
                textAlign: "center",
              }}
            >
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {!location.pathname.includes("/post/") && (
                  <Image
                    className="header-logo"
                    fixed={data.avatar.childImageSharp.fixed}
                    alt={title}
                    style={{
                      marginRight: rhythm(1 / 2),
                      marginBottom: 0,
                      borderRadius: `100%`,
                    }}
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

// const Container = styled.div`
//   display: flex;
// `

export default Header
