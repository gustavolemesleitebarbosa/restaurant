/** @type {import('next').NextConfig} */

module.exports = {
  images:{
    domains: ["res.cloudinary.com"]
  },
  async rewrites() {
    return [
      {
        source: '/:api*',
        destination: 'https://main--lustrous-zuccutto-109ef1.netlify.app/:*',
      },
    ]
  },
};