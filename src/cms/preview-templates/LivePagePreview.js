import React from "react"
import { LivePageTemplate } from "../../templates/live-page"

const LivePagePreview = ({ entry, widgetFor }) => (
  <LivePageTemplate
    title={entry.getIn(["data", "title"])}
    content={widgetFor("body")}
  />
)

export default LivePagePreview
