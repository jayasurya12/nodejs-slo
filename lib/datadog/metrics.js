const StatsD = require('hot-shots');

const isDev = true;

const client = new StatsD({
  host: 'localhost',        // Use 'datadog-agent' if in Docker
  port: 8020,               // Make sure your agent listens here
  globalTags: { env: process.env.NODE_ENV || 'dev' },
  errorHandler: isDev
    ? (error) => console.error('🔥 StatsD socket error:', error.message || error)
    : undefined,
});

const metrics = {
  // Increment
  increment: (key, tags = [], sampleRate = 1, callback) =>
    client.increment(key, sampleRate, tags, callback),

  // Decrement
  decrement: (key, tags = [], sampleRate = 1, callback) =>
    client.decrement(key, sampleRate, tags, callback),

  // Histogram
  histogram: (key, value, sampleRate = 1, tags = [], callback) =>
    client.histogram(key, value, sampleRate, tags, callback),

  // Distribution
  distribution: (key, value, tags = [], callback) =>
    client.distribution(key, value, tags, callback),

  // Gauge
  gauge: (key, value, tags = [], callback) =>
    client.gauge(key, value, tags, callback),

  // GaugeDelta
  gaugeDelta: (key, delta, tags = [], callback) =>
    client.gaugeDelta(key, delta, tags, callback),

  // Set / Unique
  set: (key, value, tags = [], callback) =>
    client.set(key, value, tags, callback),

  unique: (key, value, tags = [], callback) =>
    client.unique(key, value, tags, callback),

  // Event
  event: (title, description, options = {}, tags = [], callback) =>
    client.event(title, description, options, tags, callback),

  // Service Check
  check: (name, status, options = {}, tags = []) =>
    client.check(name, status, options, tags),

  // Timing (manual)
  timing: (key, time, tags = [], callback) =>
    client.timing(key, time, tags, callback),

  // Timer wrapper for sync function
  timer: (fn, key, tags = []) =>
    client.timer(fn, key, tags),

  // Async timer for Promise-returning functions
  asyncTimer: (fn, key, tags = []) =>
    client.asyncTimer(fn, key, tags),

  // Async distribution timer for Promise-returning functions
  asyncDistTimer: (fn, key, tags = []) =>
    client.asyncDistTimer(fn, key, tags),

  // Child client
  childClient: (options) =>
    client.childClient(options),

  // Graceful close
  close: (callback) =>
    client.close(callback),
};

module.exports = metrics;
