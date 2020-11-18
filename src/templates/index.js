import React from "react"
import { Link, graphql } from "gatsby"
import moment from "moment"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
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

    const libsynPosts = data.allJson.edges
    const posts = data.allMdx.edges
    let allPosts = [...libsynPosts, ...posts]

    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()
    const postsPerPage = 15

    allPosts = allPosts.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
    )

    return (
      <>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="Home" />
          <Nav />
          <div className="blog-post__list">
            {allPosts.map(({ node }) => {
              if (node.node) {
                const title = node.node.title
                return (
                  <div className="blog-post" key={node.fields.slug}>
                    <h3
                      className="blog-post__title"
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link
                        className="blog-post__link"
                        to={`/post/${node.fields.slug}`}
                      >
                        {title}
                      </Link>
                    </h3>
                    <small className="blog-post__date">
                      {moment(node.node.pubDate).format("MMMM Do, YYYY")}
                    </small>
                    <div
                      className="blog-post__content"
                      style={{ marginTop: rhythm(1 / 2) }}
                    >
                      {node.node.itunes.image && (
                        <LazyLoadImage
                          src={node.node.itunes.image}
                          alt={title}
                          effect="blur"
                          threshold="100"
                        />
                      )}
                      <AudioPlayer
                        source={node.node.enclosure.url || node.node.link}
                      />
                      <a href={node.node.enclosure.url || node.node.link}>
                        {node.node.title}
                      </a>
                      <p>{node.node.content.encoded}</p>
                    </div>
                    <Link
                      className="blog-post__icon"
                      to={`/post/${node.fields.slug}`}
                    >
                      &#10084;
                    </Link>
                  </div>
                )
              } else {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <div className="blog-post" key={node.fields.slug}>
                    <h3
                      className="blog-post__title"
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <Link
                        className="blog-post__link"
                        to={`/post${node.fields.slug}`}
                      >
                        {title}
                      </Link>
                    </h3>
                    <small className="blog-post__date">
                      {node.frontmatter.date}
                    </small>
                    <div
                      className="blog-post__content"
                      style={{ marginTop: rhythm(1 / 2) }}
                    >
                      <MDXProvider components={shortcodes}>
                        <MDXRenderer>{node.body}</MDXRenderer>
                      </MDXProvider>
                    </div>
                    <Link
                      className="blog-post__icon"
                      to={`/post${node.fields.slug}`}
                    >
                      &#10084;
                    </Link>
                  </div>
                )
              }
            })}
          </div>

          <div className="bumper">&#10086;</div>
          <div className="pagination pagination__home">
            {!isFirst && (
              <Link
                className="pagination__home--prev"
                to={currentPage === 2 ? `/` : `/page/${prevPage}`}
                rel="prev"
              >
                &larr; Newer
              </Link>
            )}
            {isFirst && (
              <p className="pagination__home--newer">
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
                className="pagination__home--next"
                to={`/page/${nextPage}`}
                rel="next"
              >
                Older &rarr;
              </Link>
            )}
            {isLast && (
              <p className="pagination__home--older">
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
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allJson: allLibsynJson {
      edges {
        node {
          node {
            title
            pubDate
            link
            enclosure {
              url
            }
            itunes {
              image
              keywords
            }
            content {
              encoded
            }
          }
          fields {
            slug
          }
        }
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
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
