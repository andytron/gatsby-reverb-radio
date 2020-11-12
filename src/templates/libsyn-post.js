import React from "react"
import { Link, graphql } from "gatsby"
import moment from "moment"

import Nav from "../components/nav"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Content, { HTMLContent } from "../components/content"
import AudioPlayer from "../components/audio-player"
import { rhythm, scale } from "../utils/typography"

export const LibsynPostTemplate = ({ post, content }) => {
  return (
    <div className="post">
      <h1
        className="post__title"
        style={{ letterSpacing: "2px", color: "#666", fontWeight: "700" }}
      >
        {post.title}
      </h1>
      <p
        className="post__date"
        style={{
          ...scale(-1 / 5),
          marginTop: rhythm(-1),
        }}
      >
        {moment(post.pubDate).format("MMMM Do, YYYY")}
      </p>
      {post.itunes.image && (
        <img className="post__image" src={post.itunes.image} alt={post.title} />
      )}
      <AudioPlayer source={post.enclosure.url.replace(/\?.*$/g, "")} />
      <a href={post.enclosure.url.replace(/\?.*$/g, "")}>{post.title}</a>
      <Content content={content} />
    </div>
  )
}

const LibsynPost = ({ data, pageContext, location }) => {
  const post = data.json.node
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        // description={post.frontmatter.description || post.excerpt}
      />
      <LibsynPostTemplate
        post={post}
        content={post.content.encoded}
        contentComponent={HTMLContent}
      />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Nav />
      <ul className="pagination pagination__post">
        <li>
          {previous && (
            <Link
              to={`/post/${previous.slug}`}
              className="pagination__post--prev"
              rel="prev"
            >
              ←{" "}
              {previous.title && previous.title.length > 18
                ? previous.title.substring(0, 15) + "..."
                : previous.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link
              to={`/post/${next.slug}`}
              className="pagination__post--next"
              rel="next"
            >
              {next.title.length > 18
                ? next.title.substring(0, 15) + "..."
                : next.title}{" "}
              →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default LibsynPost

export const pageQuery = graphql`
  query PostById($id: String!) {
    site {
      siteMetadata {
        title
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
    json: libsynJson(node: { id: { eq: $id } }) {
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
    }
  }
`
