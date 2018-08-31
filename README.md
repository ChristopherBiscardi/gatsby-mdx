![Logo](./img/gatsby-mdx.png)

[![Build Status](https://circleci.com/gh/ChristopherBiscardi/gatsby-mdx.svg?style=svg)](https://circleci.com/gh/ChristopherBiscardi/gatsby-mdx)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/mdx)

# Gatsby MDX

Gatsby-MDX is a fully featured MDX transformer, runtime, and ecosystem
integrations for ambitious projects. It integrates [MDX][mdx] with
[Gatsby][gatsby] to enable rich JAMStack applications. Using
gatsby-mdx you can build [interactive software documentation
sites](#editable-code-blocks), [apply design system
components](#using-design-system-components) to rendered markdown,
[give a presentation][mdx-deck], and more...

[Read the Docs](https://gatsby-mdx.netlify.com)

## What is MDX?

MDX is a JSX in Markdown loader, parser, and renderer for ambitious projects.
It combines the readability of Markdown with the expressivity of JSX.
The best of both worlds. :globe_with_meridians:

[See the MDX specification](https://github.com/mdx-js/specification)

## Plugin Options

# Getting Ambitious

## Using Design System Components

Using MDX, you can replace every HTML element that Markdown renders with a
custom implementation. This allows you to use a set of design system components
when rendering Markdown.

```js
// src/components/layout.js

import { MDXProvider } from "@mdx-js/tag";
import * as DesignSystem from "your-design-system";

export default function Layout({ children }) {
  return (
    <MDXProvider
      components={{
        // Map HTML element tag to React component
        h1: DesignSystem.H1,
        h2: DesignSystem.H2,
        h3: DesignSystem.H3,
        // Or define component inline
        p: props => <p {...props} style={{ color: "rebeccapurple" }} />
      }}
    >
      {children}
    </MDXProvider>
  );
}
```

## Editable Code Blocks

To make every markdown code block an editable live example, you can pass in a
custom `code` element to MDXProvider.

![react-live](./img/react-live.png)

```javascript
import React, { Component } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { MDXProvider } from "@mdx-js/tag";

const MyCodeComponent = ({ children, ...props }) => (
  <LiveProvider code={children}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
);

export default class MyPageLayout extends Component {
  render() {
    return (
      <MDXProvider components={{ code: MyCodeComponent }}>
        <div>{this.props.children}</div>
      </MDXProvider>
    );
  }
}
```

# Extensions

- [MDX Deck](examples/docs/content/docs/extensions/mdx-deck.mdx)

# Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

[mdx]: https://github.com/mdx-js/mdx
[gatsby]: https://www.gatsbyjs.org/
[mdx-deck]: https://github.com/jxnblk/mdx-deck
