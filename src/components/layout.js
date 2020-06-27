import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import "../../src/index.scss"
import Header from "./header"
import { rhythm } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <Wrapper className="container">
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <Header location={location} title={title} />
          <main>{children}</main>
        </div>
        <Footer style={{ fontSize: "14px" }}>
          {location.pathname.includes("/post/") && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
                color: "#333",
              }}
            >
              &#10086;
            </div>
          )}
          -{" "}
          <Link to="/" style={{ letterSpacing: "2px" }}>
            ( ( ( REVERBERATION ) ) )
          </Link>{" "}
          -
          <br />© {new Date().getFullYear()},{` `}
          <a href="https://tikirocket.com">Tiki Rocket</a>
        </Footer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

const Footer = styled.footer`
  text-align: center;
  margin: 24px;
`

export default Layout
