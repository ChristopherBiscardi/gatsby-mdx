import React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

const IndexPage = ({ data }) => (
  <div>
    {data.allFile.edges.map(({ node }) => (
      <MDXRenderer key={node.childMdx.id}>
        {node.childMdx.code.body}
      </MDXRenderer>
    ))}
  </div>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageQuery {
    allFile {
      edges {
        node {
          childMdx {
            id
            code {
              body
            }
          }
        }
      }
    }
  }
`;
