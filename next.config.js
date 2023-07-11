/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        API_URL: process.env.API_URL
    },
}

module.exports = nextConfig
