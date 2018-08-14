import React, { Component } from "react";
import { graphql } from "gatsby";
import { SlideDeck } from "mdx-deck";

import MDXRenderer from "gatsby-mdx/mdx-renderer";

export default class MDXRuntimeTest extends Component {
  render() {
    const { children, __mdxScope, data } = this.props;
    console.log(
      <MDXRenderer scope={__mdxScope}>{data.mdx.codeBody}</MDXRenderer>
    );
    return (
      <SlideDeck
        slides={
          <MDXRenderer scope={__mdxScope}>{data.mdx.codeBody}</MDXRenderer>
        }
        width="100vw"
        height="100vh"
      />
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      codeBody
    }
  }
`;
