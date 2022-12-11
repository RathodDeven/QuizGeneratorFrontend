/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    urlImports: ['https://npmcdn.com/pdfjs-dist/build/pdf.js']
  }
}

module.exports = nextConfig
