import React from "react"
import { graphql } from "gatsby"

import Nav from "../components/nav"
import Layout from "../components/layout"
import SEO from "../components/seo"

class ThanksPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Thanks" />
        <Nav />
        <div className="post__content">
          <h2>Thanks!</h2>
          <p>Your message has been sent.</p>
        </div>
      </Layout>
    )
  }
}

export default ThanksPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
