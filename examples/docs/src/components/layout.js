import React from "react";
import styled from "react-emotion";
import { MDXProvider } from "@mdx-js/tag";
import ThemeProvider from "./themeProvider";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 50rem) {
    display: block;
  }
`;

const Content = styled.main`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: 3rem 0 0 0;
  padding-left: 20rem;
  width: 100%;

  @media only screen and (max-width: 50rem) {
    padding-left: 0;
  }
`;

const MaxWidth = styled.div`
  max-width: 100%;
  width: 50rem;
  padding: 0 2rem;

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;

const Layout = ({ children, location }) => (
  <ThemeProvider>
    <MDXProvider components={mdxComponents}>
      <Wrapper>
        <Sidebar location={location} />
        <Content>
          <MaxWidth>{children}</MaxWidth>
        </Content>
      </Wrapper>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
