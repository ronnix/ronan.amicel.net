import React from "react";
import { graphql } from "gatsby"
import Layout from "../components/layout"

import moment from 'moment';

import { article, tag } from './article.module.css'

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <article className={article}>
        <header>
          <h1>{post.frontmatter.title}</h1>
          {post.frontmatter.tags &&
            <nav>
              <ul>
                {post.frontmatter.tags.map((tag) => <li key={tag} className={tag}>{tag}</li>)}
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
