/* eslint-disable react/display-name */
import React from "react";

export const GatsbyMDXContext = React.createContext({});

export const withMDXScope = Component => ({ scope, ...props }) => (
  <GatsbyMDXContext.Consumer>
    {contextScope => <Component scope={scope || contextScope} {...props} />}
  </GatsbyMDXContext.Consumer>
);

export const MDXScopeProvider = ({ __mdxScope, children }) => (
  <GatsbyMDXContext.Provider value={__mdxScope}>
    {children}
  </GatsbyMDXContext.Provider>
);
