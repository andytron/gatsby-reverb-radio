import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import Nav from "../components/nav"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AudioPlayer from "../components/audio-player"
import Content, { HTMLContent } from "../components/content"
import { rhythm, scale } from "../utils/typography"

const shortcodes = { AudioPlayer }

export const BlogPostTemplate = ({ post, content, contentComponent }) => {
  const PostContent = contentComponent || Content

  return (
    <div
      className="post-item"
      style={{
        textAlign: "center",
      }}
    >
      <h1 style={{ letterSpacing: "2px", color: "#666", fontWeight: "700" }}>
        {post.frontmatter.title}
      </h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: "1rem",
          marginTop: rhythm(-1),
        }}
      >
        {post.frontmatter.date}
      </p>
      <MDXProvider components={shortcodes}>
        <PostContent content={content} />
      </MDXProvider>
    </div>
  )
}

const BlogPost = ({ data, pageContext, location }) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  console.log(pageContext)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        // description={post.frontmatter.description || post.excerpt}
      />
      <BlogPostTemplate
        post={post}
        content={post.body}
        contentComponent={HTMLContent}
      />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <Nav />
      <ul
        className="pagination--post"
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={`post${previous.fields.slug}`} rel="prev">
              ←{" "}
              {previous.frontmatter.title > 18
                ? previous.frontmatter.title.substring(0, 15) + "..."
                : previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {(next && next.frontmatter.templateKey === 'blog-post') && (
            <Link to={`post${next.fields.slug}`} rel="next">
              {next.frontmatter.title > 18
                ? next.frontmatter.title.substring(0, 15) + "..."
                : next.frontmatter.title}{" "}
              →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(
      fields: { slug: { eq: $slug } }
      frontmatter: { templateKey: { eq: "blog-post" } }
    ) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        audio
        slug
      }
    }
  }
`
