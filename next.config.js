/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://powerful-thicket-20953-b0be64efe5ec.herokuapp.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig 