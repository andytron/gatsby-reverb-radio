import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"

export const HTMLContent = ({ content }) => (
  <div className="post__content">
    <MDXRenderer>{content}</MDXRenderer>
  </div>
)

const Content = ({ content }) => <div className="post__content">{content}</div>

export default Content
