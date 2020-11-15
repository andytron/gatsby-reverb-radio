import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"
import Content, { HTMLContent } from "../components/content"

export const SitePageTemplate = ({ content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <PageContent content={content} />
  )
}

const SitePage = ({ data, location }) => {
  const { mdx: post } = data
  const pageTitle = post.frontmatter.title
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={pageTitle} />
      <Nav />
      <SitePageTemplate
        content={post.body}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

export default SitePage

export const livePageQuery = graphql`
  query SitePage($id: String!) {
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
