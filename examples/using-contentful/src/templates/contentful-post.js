import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm, scale } from '../utils/typography'

export default class ContentfulPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.meta.title} | ${siteTitle}`}
        />
        <h1>{post.meta.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        />
        <div>
          <MDXRenderer scope={this.props.__mdxScope}>
            {post.code.body}
          </MDXRenderer>
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.meta.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.meta.title} →
              </Link>
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx: contentfulBlogPostMdx(id: { eq: $id }) {
      id
      excerpt
      code {
        body
      }
      meta {
        title
      }
    }
  }
`
