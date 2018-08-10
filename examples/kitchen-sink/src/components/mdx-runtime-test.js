import React, { Component } from "react";
import { graphql } from "gatsby";

import MDXRenderer from "gatsby-mdx/mdx-renderer";

export default class MDXRuntimeTest extends Component {
  render() {
    const { children, __mdxScope, data } = this.props;
    return (
      <div>
        <h1>Uses MDXRenderer</h1>
        <div>{children}</div>
        <MDXRenderer scope={__mdxScope}>{data.mdx.codeBody}</MDXRenderer>
      </div>
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
