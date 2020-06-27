/**
 * Nav component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from "styled-components"

function Nav() {
  return (
    <StaticQuery
      query={navQuery}
      render={data => {
        const { links } = data.site.siteMetadata
        return (
          <Container>
            <ul
              className="nav-list"
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `center`,
                width: "100%",
                padding: 0,
                listStyle: `none`,
                letterSpacing: "2px",
              }}
            >
              <li>
                <a href={`https://${links.tikiRocketUrl}`}>Tiki Rocket</a>
              </li>
              <li>
                <a
                  href={`https://podcasts.apple.com/us/podcast/${links.podcast}`}
                >
                  Podcast
                </a>
              </li>
              <li>
                <a href={`https://instagram.com/${links.instagram}`}>Insta</a>
              </li>
              <li>
                <Link to="/live">Live</Link>
              </li>
              <li>
                <a href={`mailto:${links.email}`}>Contact</a>
              </li>
            </ul>
          </Container>
        )
      }}
    />
  )
}

const navQuery = graphql`
  query NavQuery {
    site {
      siteMetadata {
        author
        links {
          tikiRocketUrl
          podcast
          instagram
          twitter
          email
        }
      }
    }
  }
`

const Container = styled.div`
  display: flex;
`

export default Nav
