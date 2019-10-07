const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const slugifyPost = require('./slugifyPost');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.createPagesStatefully = async ({ graphql, actions }) => {
  const { createPage } = actions

  const miscPost = path.resolve(`./src/templates/misc-post.js`)

  const result = await graphql(`
  {
    postgres {
      posts {
        edges {
          node {
            id
            summary
            body
            headline
          }
        }
      }
    }
  }
  `);

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.postgres.posts.edges

  // posts.forEach(({ id, name }) => {
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: slugifyPost(post.node),
      component: miscPost,
      context: {
        postId: post.node.id,
        slug: slugifyPost(post.node),
        previous,
        next,
      },
    })
  });
}

exports.sourceNodes = async ({ graphql, actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const result = await graphql(`
  {
    postgres {
      posts {
        edges {
          node {
            id
            summary
            body
            headline
          }
        }
      }
    }
  }
  `);

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.postgres.posts.edges

  // posts.forEach(({ id, name }) => {
  posts.forEach((post, index) => {
    const nodeContent = JSON.stringify(post);
    const nodeMeta = {
      id: createNodeId(`misc-post-${post.node.id}`),
      parent: null,
      children: [],
      internal: {
        type: `MiscPost`,
        content: nodeContent,
        contentDigest: createContentDigest(post)
      }
    };
    const node = Object.assign({}, datum, nodeMeta);
    createNode(node);

    createPage({
      path: slugifyPost(post.node),
      component: miscPost,
      context: {
        postId: post.node.id,
        slug: slugifyPost(post.node),
        previous,
        next,
      },
    })
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if(node && node.id && node.id.includes("misc-post")) {
    console.log(node)
  }

  // if(node && node.path && node.path.includes("compatible-needs-based-implementation")) {
  //   console.log(node)
  // }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
