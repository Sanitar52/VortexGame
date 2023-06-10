module.exports = {
    images: {
      domains: ['cdn.discordapp.com', 'pixy.org'],
    },
    env: {
      BACKEND_BASE_URL: process.env.NEXT_BACKEND_BASE_URL,
      GRAPHQL_BASE_URL: process.env.NEXT_GRAPHQL_BASE_URL,
    }
  };