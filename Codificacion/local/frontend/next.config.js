module.exports = {
  publicRuntimeConfig: {
    api_url: "http://localhost:8091",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/iniciar-sesion",
        permanent: true,
      },
    ];
  },
};
