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

const LivePage = ({ data }) => {
  const { allMdx: post } = data
  const siteTitle = data.site.siteMetadata.title
  const location = window.location

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Live" />
      <Nav />
      <LivePageTemplate
        content={post.edges[0].node.body}
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
    allMdx(filter: {id: {eq: $id}}) {
      edges {
        node {
          id
          body
          frontmatter {
            title
          }
        }
      }
    }
  }
`
