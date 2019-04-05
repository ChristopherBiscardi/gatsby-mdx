import React, { Fragment } from "react";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { graphql, Link } from "gatsby";

const Wrapper = styled("section")`
  align-items: center;
  background: #282a36;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const IndexPage = ({ data }) => (
  <Fragment>
    <Helmet>
      <title>Gatsby Emotion</title>
      <meta name="description" content="Gatsby example site using Emotion" />
      <meta name="referrer" content="origin" />
    </Helmet>
    <Wrapper>
      <h1
        className={css`
          font-size: 1.5em;
          color: #ff79c6;
          margin-bottom: 0.5em;
        `}
      >
        Hello World, this is my first component styled with
        {` `}
        <a
          className={css`
            color: #8be9fd;
          `}
          href="https://emotion.sh/"
        >
          emotion
        </a>
        !
      </h1>
      <p
        className={css`
          color: #bd93f9;
        `}
      >
        <a
          href="https://www.gatsbyjs.org/packages/gatsby-plugin-emotion/"
          className={css`
            color: inherit;
          `}
        >
          gatsby-plugin-emotion docs
        </a>
      </p>
      <h2
        className={css`
          margin-top: 1.5em;
        `}
      >
        Example Pages
      </h2>
      <ul
        className={css`
          list-style-type: none;
        `}
      >
        {data.allSitePage.edges.map(({ node }) => (
          <li key={node.id}>
            <Link
              className={css`
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
