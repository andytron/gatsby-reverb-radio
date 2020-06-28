import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Content, { HTMLContent } from "../components/content"

export const LivePageTemplate = ({ content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <PageContent content={content} />
  )
}

const LivePage = ({ data, location }) => {
  const { mdx: post } = data
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <Nav />
      <LivePageTemplate
        content={post.body}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

export default LivePage

export const livePageQuery = graphql`
  query LivePage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: {eq: $id}) {
      body
      id
      frontmatter {
        title
      }
    }
  }
`
