import React from "react"
import { SitePageTemplate } from "../../templates/site-page"

const SitePagePreview = ({ entry, widgetFor }) => (
  <SitePageTemplate
    title={entry.getIn(["data", "title"])}
    content={widgetFor("body")}
  />
)

export default SitePagePreview
