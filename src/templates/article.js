import React from "react";
import { graphql } from "gatsby"
import Layout from "../components/layout"

import moment from 'moment';

import { article, tag } from './article.module.css'

const ArticleTemplate = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article className={article}>
        <header>
          <h1>{post.frontmatter.title}</h1>
          {post.frontmatter.tags &&
            <nav>
              <ul>
                {post.frontmatter.tags.map((t) => <li key={t} className={tag}>{t}</li>)}
              </ul>
            </nav>
          }
          <time dateTime={post.frontmatter.date}>
            {moment(post.frontmatter.date).locale('fr').format('LL')}
          </time>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
};

export default ArticleTemplate;

export const Head = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title} - Ronan Amicel</title>
  </>
)

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        tags
      }
    }
  }
`;
