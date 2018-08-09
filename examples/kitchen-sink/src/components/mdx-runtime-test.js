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
  query MDXThing {
    mdx(id: { eq: "e8215648-9479-5521-86f0-988e189139c7" }) {
      id
      codeBody
    }
  }
`;
