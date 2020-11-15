import CMS from "netlify-cms-app"
// import uploadcare from "netlify-cms-media-library-uploadcare"
// import cloudinary from "netlify-cms-media-library-cloudinary"

import SitePagePreview from "./preview-templates/SitePagePreview"
import BlogPostPreview from "./preview-templates/BlogPostPreview"

// CMS.registerMediaLibrary(uploadcare)
// CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate("site", SitePagePreview)
CMS.registerPreviewTemplate("blog", BlogPostPreview)