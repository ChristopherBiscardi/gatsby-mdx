# Gatsby MDX

[MDX](https://github.com/mdx-js/mdx) integration with
[Gatsby](https://www.gatsbyjs.org/) for ambitious projects.

## Initial Setup

```bash
npm install gatsby-mdx @mdx-js/loader @mdx-js/mdx
```

then add `gatsby-mdx` to your `gatsby-config.js` in the `plugins` section.

```javascript
module.exports = {
  siteMetadata: {
    title: `My Ambitious Project`
  },
  plugins: [`gatsby-mdx`]
};
```

note: gatsby-mdx is [only compatible with gatsby versions > 2](https://github.com/ChristopherBiscardi/gatsby-mdx/issues/22)

## Writing Pages in MDX

Add an `.mdx` file in the `src/pages` directory. It "Just Works".

```
# My first MDX Page

some awesome content
```

## Plugin Options

### File Extensions

gatsby-mdx can apply to different file extensions. By default it
conservatively applies to only `.mdx` files, but can also be made to
apply to `.md` files.

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [".mdx", ".md"]
      }
    }
  ]
};
```

## Default Layouts

MDX supports layouts using the default export as such:

```javascript
export default ({ children }) => (
  <div>
    <h1>My Layout</h1>
    <div>{children}</div>
  </div>
)


# My MDX

some content
```

or as an import:

```javascript
import PageLayout from './src/components/page-layout';
export PageLayout

# My MDX

some content
```

Sometimes you don't want to include the layout in every file, so
gatsby-mdx offers the option to set a default layout in the
`gatsby-config.js` plugin config:

```javascript
module.exports = {
  siteMetadata: {
    title: `Gatsby MDX Kitchen Sink`
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayout: require.resolve(
          "./src/components/default-page-layout.js"
        )
      }
    }
  ]
};
```

### GraphQL

MDX files can be queried with `allMdx` on the root query.

```graphql
query MDXQuery {
  allMdx {
    edges {
      node {
        relativePath
        fileAbsolutePath
        fileNode {
          name
        }
      }
    }
  }
}
```

## Programmatically Creating Pages

Pages can be created programmatically by combining
`gatsby-source-filesystem` in `gatsby-config.js` with some
`createPage` calls.

```javascript
# gatsby-config.js
module.exports = {
  plugins: [
  `gatsby-mdx`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/`
      }
    }
  ]
};
```

```javascript
# gatsby-node.js
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fileAbsolutePath
                  fileNode {
                    name
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: `/non-page/${node.fileNode.name}`,
            component: node.fileAbsolutePath, //blogPost,
            context: { absPath: node.absolutePath }
          });
        });
      })
    );
  });
};
```

# Getting Ambitious

## Using Design System Components

Using MDX, you can replace every html element that markdown renders to
with a custom implementation. This allows you to use a set of design
system components to when rendering markdown.

```javascript
<MDXProvider components={{ h1: H1 }}>{this.props.children}</MDXProvider>
```

## Editable Code Blocks
