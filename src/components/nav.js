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
          <Container className="nav">
            <ul className="nav__list">
              <li className="nav__list-item">
                <a
                  href={`https://${links.tikiRocketUrl}`}
                  className="nav__link"
                >
                  Tiki Rocket
                </a>
              </li>
              <li className="nav__list-item">
                <a
                  href={`https://podcasts.apple.com/us/podcast/${links.podcast}`}
                  className="nav__link"
                >
                  Podcast
                </a>
              </li>
              <li className="nav__list-item">
                <a
                  href={`https://instagram.com/${links.instagram}`}
                  className="nav__link"
                >
                  Insta
                </a>
              </li>
              <li className="nav__list-item">
                <Link to="/live" className="nav__link">
                  Live
                </Link>
              </li>
              <li className="nav__list-item">
                <a href={`mailto:${links.email}`} className="nav__link">
                  Contact
                </a>
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
