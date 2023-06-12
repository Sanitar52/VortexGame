
module.exports = {
    images: {
      domains: ['cdn.discordapp.com', 'pixy.org'],
    },
    env: {
      BACKEND_BASE_URL: process.env.NEXT_BACKEND_BASE_URL,
      GRAPHQL_BASE_URL: process.env.NEXT_GRAPHQL_BASE_URL,

    },
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
            {
              key: 'Access-Control-Allow-Origin',
              value: 'https://vortex-game-production.up.railway.app',
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, Set-Cookie, Authorization',
            },
          ],
        },
      ]
    }
  };