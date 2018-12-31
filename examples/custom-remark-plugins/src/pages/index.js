import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import { css } from "@emotion/core";

const Wrapper = props => (
  <section
    css={css`
      align-items: center;
      background: #282a36;
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: center;
      width: 100vw;
    `}
    {...props}
  />
);

const IndexPage = ({ data }) => (
  <Fragment>
    <Helmet>
      <title>Gatsby Emotion</title>
      <meta name="description" content="Gatsby example site using Emotion" />
      <meta name="referrer" content="origin" />
    </Helmet>
    <Wrapper>
      <h2
        css={css`
          margin-top: 1.5em;
        `}
      >
        Example Pages
      </h2>
      <ul
        css={css`
          list-style-type: none;
        `}
      >
        {data.allSitePage.edges.map(({ node }) => (
          <li key={node.id}>
            <Link
              css={css`
                color: #8be9fd;
              `}
              to={node.path}
            >
              {node.path}
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  </Fragment>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageQuery {
    allSitePage {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
          path
        }
      }
    }
  }
`;
