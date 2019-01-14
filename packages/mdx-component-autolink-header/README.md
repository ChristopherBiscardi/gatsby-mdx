# MDX Component Autolink Header

A drop-in replacement for [gatsby-remark-autolink-headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/)

# Usage

```js
import Header from "mdx-component-autolink-header";

const components = {
  h1: props => <Header is="h1" {...props} />
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
```
