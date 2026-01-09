import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from "../../components/layout"

import moment from 'moment';

import { article, articles } from './index.module.css'

const ArticlesPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges.filter(edge => edge.node.fields.slug.startsWith('/articles/'))
  return <Layout>
    <div className={articles}>
      {posts.map(({ node }) => (
        <div className={article} key={node.id}>
          <time dateTime={node.frontmatter.date}>
            {moment(node.frontmatter.date).locale('fr').format('LL')}
          </time>
          <h3><Link to={node.fields.slug}>{node.frontmatter.title}</Link></h3>
          <p>{node.excerpt}</p>
          <Link to={node.fields.slug}>
          Lire la suite...
          </Link>
        </div>
      ))}
    </div>
  </Layout>
}

export default ArticlesPage

export const Head = () => (
  <>
    <title>Articles - Ronan Amicel</title>
    <meta name="description" content="Articles de blog de Ronan Amicel" />
  </>
)

export const query = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
