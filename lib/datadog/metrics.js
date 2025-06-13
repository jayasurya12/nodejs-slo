const StatsD = require('hot-shots');

const client = new StatsD({
  host: 'localhost', // Update if running Datadog agent on a different host
  port: 8125,
  globalTags: { env: process.env.NODE_ENV || 'local' },
  errorHandler: (error) => {
    console.error('🔥 StatsD socket error:', error);
  },
});

module.exports = {
  increment: (key, tags) => {
    console.log(`📈 increment: ${key}`, tags || '');
    client.increment(key, tags);
  },
  timing: (key, time, tags) => {
    console.log(`⏱️ timing: ${key} - ${time}ms`, tags || '');
    client.timing(key, time, tags);
  },
  gauge: (key, value, tags) => {
    console.log(`📊 gauge: ${key} = ${value}`, tags || '');
    client.gauge(key, value, tags);
  },
  histogram: (key, value, tags) => {
    console.log(`📉 histogram: ${key} = ${value}`, tags || '');
    client.histogram(key, value, tags);
  },
  close: (callback) => {
    console.log('📦 Closing StatsD client');
    client.close(callback);
  },
};
