import React, { Component } from "react";
import { graphql } from "gatsby";

import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from "@mdx-js/tag";

import Highlight, { defaultProps } from "prism-react-renderer";

const CodeBlock = ({ children: exampleCode, ...props }) => (
  <Highlight {...defaultProps} code={exampleCode} language="jsx">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export default class MDXRuntimeTest extends Component {
  render() {
    const { children, data, tableOfContents, ...props } = this.props;

    return (
      <MDXProvider
        components={{
          code: CodeBlock
        }}
      >
        <div>
          <h1>Uses MDXRenderer</h1>
          <div>{children}</div>
          <MDXRenderer tableOfContents={tableOfContents}>
            {data.mdx.code.body}
          </MDXRenderer>
        </div>
      </MDXProvider>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
      tableOfContents
    }
  }
`;
