import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <div
          className="not-found"
          style={{
            textAlign: "center",
          }}
        >
          <h3
            style={{
              letterSpacing: "2px",
              color: "#666",
              fontWeight: "700",
            }}
          >
            Not Found
          </h3>
          <p style={{ fontSize: "14px" }}>
            The URL you requested could not be found. Go back{" "}
            <Link to="/" style={{ color: "black" }}>
              home
            </Link>
            .
          </p>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
