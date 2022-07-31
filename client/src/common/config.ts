const config = {
  server: import.meta.env.VITE_BACKEND_SERVER,
  api: {
    faker: () => `${config.server}/api/faker`,
  },
};

export default config;
