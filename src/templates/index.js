import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import AudioPlayer from "../components/audio-player"
import ScrollTopArrow from "../components/scroll-arrow"
import { rhythm } from "../utils/typography"

const shortcodes = { AudioPlayer }

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="Home" />
          <Nav />
          <div
            className="blog-roll"
            style={{
              margin: "20px 0 40px",
              textAlign: "center",
            }}
          >
            {posts.map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div key={node.fields.slug}>
                  <h3
                    className="blog-roll__item-header"
                    style={{
                      marginBottom: rhythm(1 / 4),
                      letterSpacing: "2px",
                    }}
                  >
                    <Link
                      style={{
                        boxShadow: `none`,
                        color: `#666`,
                        fontWeight: `700`,
                      }}
                      to={`post${node.fields.slug}`}
                    >
                      {title}
                    </Link>
                  </h3>
                  <small>{node.frontmatter.date}</small>
                  <div
                    className="post-wrapper"
                    style={{ marginTop: rhythm(1 / 2) }}
                  >
                    <MDXProvider components={shortcodes}>
                      <MDXRenderer>{node.body}</MDXRenderer>
                    </MDXProvider>
                  </div>
                  <Link
                    className="icon-link"
                    style={{ boxShadow: `none` }}
                    to={`post${node.fields.slug}`}
                  >
                    &#10084;
                  </Link>
                </div>
              )
            })}
          </div>

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
          <div
            className="pagination--list"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
              maxWidth: "50%",
              fontSize: "14px",
            }}
          >
            {!isFirst && (
              <Link
                to={currentPage === 2 ? `/` : `page/${prevPage}`}
                rel="prev"
                style={{
                  boxShadow: "none",
                  marginRight: "1rem",
                }}
              >
                &larr; Newer
              </Link>
            )}
            {isFirst && (
              <p
                style={{
                  marginRight: "1rem",
                  color: "#999",
                }}
              >
                &larr; Newer
              </p>
            )}
            <p>
              {currentPage} / {numPages}
            </p>
            {/* {Array.from({ length: numPages }, (_, i) => (
              <li key={`pagination-number${i + 1}`}>
                <Link
                  to={i === 0 ? `/` : `page/${i + 1}`}
                  style={{
                    fontWeight: i + 1 === currentPage ? "bold" : "normal",
                  }}
                >
                  {i + 1}
                </Link>
              </li>
            )).slice(currentPage - 1, currentPage + 4)} */}
            {!isLast && (
              <Link
                to={`page/${nextPage}`}
                rel="next"
                style={{
                  boxShadow: "none",
                  marginLeft: "1rem",
                }}
              >
                Older &rarr;
              </Link>
            )}
            {isLast && (
              <p
                style={{
                  marginLeft: "1rem",
                  color: "#999",
                }}
              >
                Older &rarr;
              </p>
            )}
          </div>
        </Layout>
        <ScrollTopArrow />
      </>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          body
          frontmatter {
            templateKey
            title
            date(formatString: "MMMM DD, YYYY")
            audio
            slug
          }
        }
      }
    }
  }
`
