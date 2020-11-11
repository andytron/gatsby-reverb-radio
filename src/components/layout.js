import React from "react"
import styled from "styled-components"

import "../../src/index.scss"
import Header from "./header"
import Footer from "./footer"
import { rhythm } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props

    return (
      <Wrapper className="container">
        <div
          className="content-wrapper"
          style={{
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <Header location={location} title={title} />
          <main className="content">{children}</main>
        </div>
        <Footer location={location} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  min-height: 100vh;
`

export default Layout
