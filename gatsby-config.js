module.exports = {
  siteMetadata: {
    title: 'Ronan Amicel',
    description: 'Site personnel de Ronan Amicel',
    keywords: 'Ronan Amicel, home page, blog',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
}
