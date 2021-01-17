import React from "react"
import Helmet from "react-helmet"

const TourDates = () => {
  return (
    <>
      <Helmet>
        <script src="https://widget.bandsintown.com/main.min.js" />
      </Helmet>
      <div className="bit-widget-initializer" data-artist-name="Reverberation" data-display-local-dates="false" data-display-past-dates="true" data-auto-style="false" data-text-color="#000000" data-link-color="#2F95DE" data-popup-background-color="#FFFFFF" data-background-color="#FFFFFF" data-display-limit="15" data-link-text-color="#FFFFFF" />
    </>
  )
}

export default TourDates
