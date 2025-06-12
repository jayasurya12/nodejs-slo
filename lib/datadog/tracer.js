const tracer = require('dd-trace').init({
    service: 'slo-simulator',
    hostname: 'datadog-agent'
  });
  module.exports = tracer;