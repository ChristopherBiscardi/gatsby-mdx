import React from "react";
import { MDXProvider } from "@mdx-js/react";

const RootWrapper = ({ children }) => (
  <MDXProvider
    components={{
      h1: ({ children, ...props }) => <h1 {...props}>Provided: {children}</h1>,
      wrapper: "section"
    }}
  >
    {children}
  </MDXProvider>
);
export default RootWrapper;
