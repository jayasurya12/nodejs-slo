const tracer = require('dd-trace').init({
    service: 'slo-simulator',
    hostname: 'localhost'
  });
  module.exports = tracer;

