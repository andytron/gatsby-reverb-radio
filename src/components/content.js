import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

export const HTMLContent = ({ content }) => (
  <div className="content">
    <MDXRenderer>{content}</MDXRenderer>
  </div>
)

const Content = ({ content }) => (
  <div className="content">{content}</div>
)

export default Content