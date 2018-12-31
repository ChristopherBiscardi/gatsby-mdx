import React from "react";
import Helmet from "react-helmet";
import { graphql, StaticQuery } from "gatsby";
import { Edit3 } from "react-feather";
import { Layout, Link } from "$components";

// force top-level navigation to be a certain order
//const forcedNavOrder = ["/getting-started", "/guides"];

// Add an item node in the tree, at the right position
function addToTree(treeNodes, node) {
  let pushed = false;
  // Check if the item node should inserted in a subnode
  treeNodes.forEach(treeNode => {
    // "/store/travel".indexOf( '/store/' )
    if (node.link.indexOf(treeNode.link + "/") === 0) {
      treeNode.items = treeNode.items || [];
      pushed = true;
      addToTree(treeNode.items, node);
    }
  });

  if (!pushed) {
    // Item node was not added to a subnode, so it's a sibling of these treeNodes
    treeNodes.push({
      title: node.title,
      link: node.link
    });
  }

  return treeNodes;
}

/**
 * create the tree for navigation items. looks like this, where items
 * is the same as the item shown. link and items are optional
 *
 * [{
 *   title: 'Some Title',
 *   link: '/maybe/some/link',
 *   items: [...]
 * }]
 */
function createTree(nodes) {
  // algo depends on shorter URLs being first in the list
  return nodes
    .sort((a, b) => a.link.split("/").length - b.link.split("/").length)
    .reduce(addToTree, []);
}

const reduceNavTwo = allMdx => {
  const edges = allMdx.edges
    .filter(({ node }) => node.fields.slug !== "/")
    .map(({ node }) => ({
      title: node.frontmatter.title,
      link: node.fields.slug
    }));
  return createTree(edges).sort((a, b) => {
    const aScore = a.items ? a.items.length : 0;
    const bScore = b.items ? b.items.length : 0;
    return bScore - aScore;
  });
};

const RawLayout = props => <div>{props.children}</div>;

const DocLayout = ({ children, ...props }) =>
  props.location.pathname === "/" ? (
    <RawLayout {...props}>{children}</RawLayout>
  ) : (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              docsLocation
            }
          }
          allMdx {
            edges {
              node {
                frontmatter {
                  title
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={({ site, allMdx }) => {
        const itemList = reduceNavTwo(allMdx);
        return (
          <Layout {...props} itemList={itemList}>
            <Helmet />
            <h1 css={{ fontSize: `2.5rem`, marginBottom: `2rem` }} />
            {children}
            <div
              css={{
                width: "100%",
                margin: "4rem 0 2rem",
                padding: "1rem 1.5rem",
                borderTop: "1px solid #ddd",
                textAlign: "right"
              }}
            >
              <Link
                to={`${site.siteMetadata.docsLocation}`}
                css={{
                  textDecoration: "none",
                  color: "#555",
                  "&:hover": {
                    color: "#663399"
                  }
                }}
              >
                <Edit3 size={16} /> edit this page on GitHub
              </Link>
            </div>
          </Layout>
        );
      }}
    />
  );

export default DocLayout;
