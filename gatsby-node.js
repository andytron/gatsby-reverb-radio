const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const blogPost = path.resolve(`./src/templates/blog-post.js`)
const sitePage = path.resolve(`./src/templates/live-page.js`)
const indexPage = path.resolve(`./src/templates/index.js`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              slug
              templateKey
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMdx.edges

    posts.forEach((edge, index) => {
      const id = edge.node.id

      if (edge.node.frontmatter.templateKey === 'blog-post') {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node
        createPage({
          path: `post${edge.node.fields.slug}`,
          component: blogPost,
          context: {
            slug: edge.node.fields.slug,
            id,
            previous,
            next,
          },
        })
      } else {
        createPage({
          path: edge.node.fields.slug,
          component: sitePage,
          context: {
            slug: edge.node.fields.slug,
            id,
          },
        })
      }

      // templates/index pagination
      const blogPosts = posts.filter(edge => edge.node.frontmatter.templateKey === 'blog-post')
      const postsPerPage = 15
      const numPages = Math.ceil(blogPosts.length / postsPerPage)

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/page/${i + 1}`,
          component: indexPage,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
