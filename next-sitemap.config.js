// next-sitemap configuration – generates sitemap.xml and robots.txt
// https://github.com/iamvishnusankar/next-sitemap
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aiheadshot.app",
    generateRobotsTxt: true,
    // optional: change frequency & priority defaults
    // changefreq: "daily",
    // priority: 0.7,
    // exclude API routes from the sitemap
    exclude: ["/api/*"],
};
