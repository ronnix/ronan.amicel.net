import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"

import Sidebar from './sidebar'
import './layout.css'

// Styles for code syntax highlighting
require('prismjs/themes/prism.css')

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
      }
    `}
    render={data => (
      <div className="layout">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: data.site.siteMetadata.description },
            { name: 'keywords', content: data.site.siteMetadata.keywords },
          ]}
          link={{
            rel: 'alternate',
            type: 'application/rss+xml',
            href: '/rss.xml',
          }}
        />
        <div>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main">
            {children}
          </div>
        </div>
      </div>
    )}
  />
)
