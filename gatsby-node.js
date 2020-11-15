const path = require(`path`)
const fs = require(`fs`)
const moment = require(`moment`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const blogPost = path.resolve(`./src/templates/blog-post.js`)
const libsynPost = path.resolve(`./src/templates/libsyn-post.js`)
const sitePage = path.resolve(`./src/templates/site-page.js`)
const indexPage = path.resolve(`./src/templates/index.js`)

function buildSlug(date, title) {
  return `${moment(date).format("YYYY-MM-DD")}-${title
    .replace(/\W+/g, "-")
    .toLowerCase()}`
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
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
      allFeedReverbRadio(
        filter: { isoDate: { gt: "2020-05-28T20:33:59.000Z" } }
      ) {
        edges {
          node {
            id
            title
            link
            enclosure {
              url
            }
            itunes {
              image
              keywords
            }
            content {
              encoded
            }
            pubDate
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const libsynPosts = result.data.allFeedReverbRadio.edges

    fs.writeFileSync(
      "./src/data/libsyn.json",
      JSON.stringify(libsynPosts, null, 2)
    )

    const posts = result.data.allMdx.edges

    const blogPosts = posts.filter(
      edge => edge.node.frontmatter.templateKey === "blog-post"
    )

    libsynPosts.forEach((edge, index) => {
      const id = edge.node.id
      const previous =
        index === libsynPosts.length - 1
          ? {
            ...blogPosts[0].node,
            slug: blogPosts[0].node.fields.slug.replace('/', ''),
            title: blogPosts[0].node.frontmatter.title
          }
          : {
              ...libsynPosts[index + 1].node,
              slug: `${buildSlug(
                libsynPosts[index + 1].node.pubDate,
                libsynPosts[index + 1].node.title
              )}`,
            }
      const next =
        index === 0
          ? null
          : {
              ...libsynPosts[index - 1].node,
              slug: `${buildSlug(
                libsynPosts[index - 1].node.pubDate,
                libsynPosts[index - 1].node.title
              )}`,
            }

      createPage({
        path: `post/${buildSlug(edge.node.pubDate, edge.node.title)}`,
        component: libsynPost,
        context: {
          slug: buildSlug(edge.node.pubDate, edge.node.title),
          id,
          previous,
          next,
        },
      })
    })

    posts.forEach((edge, index) => {
      const id = edge.node.id

      if (edge.node.frontmatter.templateKey === "blog-post") {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0
          ? null
          : posts[index - 1].node
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

      // index page pagination
      const blogPosts = posts.filter(
        edge => edge.node.frontmatter.templateKey === "blog-post"
      )
      const allPosts = [...blogPosts, ...libsynPosts]
      const postsPerPage = 15
      const numPages = Math.ceil(allPosts.length / postsPerPage)

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/page/${i + 1}`,
          component: indexPage,
          context: {
            numPages,
            currentPage: i + 1,
          },
        })
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode, createContentDigest }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `LibsynJson`) {
    const textNode = {
      id: `${node.id}-MarkdownBody`,
      parent: node.id,
      dir: path.resolve(`./`),
      internal: {
        type: `${node.internal.type}MarkdownBody`,
        mediaType: `text/markdown`,
        content: node.node.content.encoded,
        contentDigest: createContentDigest(node.node.content.encoded),
      },
    }
    createNode(textNode)

    // create markdownBody___NODE field
    createNodeField({
      node,
      name: `markdownBody___NODE`,
      value: textNode.id,
    })

    // create slug field
    createNodeField({
      name: `slug`,
      node,
      value: buildSlug(node.node.pubDate, node.node.title)
    })
  }
}
