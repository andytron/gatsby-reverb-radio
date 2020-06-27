const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const allData = await graphql(`
    {
      allPosts: allMdx(
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
              title
              templateKey
            }
          }
        }
      }
      blogPosts: allMdx(
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
              title
              templateKey
            }
          }
        }
      }
    }
  `)

  const { allPosts, blogPosts } = allData.data

  // Create blog posts pages
  const posts = blogPosts.edges
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  posts
    .forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: `post${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

  const postsPerPage = 15
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: path.resolve("./src/templates/index.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  allPosts.edges
    .filter(post => post.node.frontmatter.templateKey !== "blog-post")
    .forEach(post => {
      const id = post.node.id

      createPage({
        path: post.node.fields.slug,
        component: path.resolve(
          `./src/templates/${String(post.node.frontmatter.templateKey)}.js`
        ),
        context: {
          id,
        },
      })
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
