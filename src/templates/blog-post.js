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
    <div className="post">
      <h1 className="post__title">{post.frontmatter.title}</h1>
      <p
        className="post__date"
        style={{
          ...scale(-1 / 5),
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
  const libsynPost = data.libsyn
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  let nextPost;

  if (next && next.frontmatter.templateKey === "blog-post") {
    nextPost = <Link
        to={`/post${next.fields.slug}`}
        className="pagination__post--next"
        rel="next"
      >
        {next.frontmatter.title.length > 18
          ? next.frontmatter.title.substring(0, 15) + "..."
          : next.frontmatter.title}{" "}
        →
      </Link>
  } else {
    nextPost = <Link
        to={`/post/${libsynPost.fields.slug}`}
        className="pagination__post--next"
        rel="next"
      >
        {libsynPost.node.title.length > 18
          ? libsynPost.node.title.substring(0, 15) + "..."
          : libsynPost.node.title}{" "}
        →
      </Link>
  }

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
      <ul className="pagination pagination__post">
        <li>
          {previous && (
            <Link
              to={`/post${previous.fields.slug}`}
              className="pagination__post--prev"
              rel="prev"
            >
              ←{" "}
              {previous.frontmatter.title.length > 18
                ? previous.frontmatter.title.substring(0, 15) + "..."
                : previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {nextPost}
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
    libsyn: libsynJson(id: {eq: "87c5e6b5-d41c-5702-8d0c-5f3135b54c90"}) {
      node {
        title
      }
      fields {
        slug
      }
    }
  }
`
