import CMS from "netlify-cms-app"
// import uploadcare from "netlify-cms-media-library-uploadcare"
// import cloudinary from "netlify-cms-media-library-cloudinary"

import LivePagePreview from "./preview-templates/LivePagePreview"
import BlogPostPreview from "./preview-templates/BlogPostPreview"

// CMS.registerMediaLibrary(uploadcare)
// CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate("live", LivePagePreview)
CMS.registerPreviewTemplate("blog", BlogPostPreview)