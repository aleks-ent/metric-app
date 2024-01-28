/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://isgitprojectactive.info',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
