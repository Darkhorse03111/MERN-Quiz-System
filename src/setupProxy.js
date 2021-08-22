const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://arcane-atoll-82454.herokuapp.com',
      changeOrigin: true,
    })
  );
};