import React, { createContext, useContext } from "react";

const GatsbyMDXScopeContext = createContext({});

export const useMDXScope = scope => {
  const contextScope = useContext(GatsbyMDXScopeContext);
  return scope || contextScope;
};

export const MDXScopeProvider = ({ __mdxScope, children }) => (
  <GatsbyMDXScopeContext.Provider value={__mdxScope}>
    {children}
  </GatsbyMDXScopeContext.Provider>
);
