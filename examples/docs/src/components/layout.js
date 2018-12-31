import React from "react";
import { css } from "@emotion/core";

import { Navigation } from "../components/navigation";
import GatsbySidebar from "./gatsby-sidebar";

const Layout = ({ children, location, itemList }) => (
  <React.Fragment>
    <Navigation />
    <div
      css={css`
        display: flex;
        justify-content: space-between;

        @media only screen and (max-width: 50rem) {
          display: block;
        }
      `}
    >
      <GatsbySidebar location={location} itemList={itemList} />
      <main
        css={css`
          display: flex;
          flex-grow: 1;
          justify-content: center;
          margin: 3rem 0 0 0;
          padding-left: 20rem;
          width: 100%;

          @media only screen and (max-width: 50rem) {
            padding-left: 0;
          }
        `}
      >
        <div
          css={css`
            max-width: 100%;
            width: 50rem;
            padding: 0 2rem;

            @media only screen and (max-width: 50rem) {
              width: 100%;
              position: relative;
            }
          `}
        >
          {children}
        </div>
      </main>
    </div>
  </React.Fragment>
);

export default Layout;
