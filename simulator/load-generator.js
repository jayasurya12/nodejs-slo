const axios = require('axios');
const routes = require('./routes-map');

setInterval(() => {
  const r = routes[Math.floor(Math.random() * routes.length)];
  axios({ method: r.method, url: `http://${r.host}:${r.port}${r.path}` })
    .catch(() => {});
}, 1000);