const express = require('express');
// const tracer = require('../../lib/datadog/tracer');
const tracer = require('dd-trace').init();
const metrics = require('../../lib/datadog/metrics');
const app = express();

app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
  console.log(`📥 [User-Service] Incoming: ${req.method} ${req.url}`);
  next();
});

// Simulate a success/failure scenario
const simulate = async (metricNameSuccess, metricNameFail, successRate = 0.7, delay = 500) => {
  const random = Math.random();
  if (random < 1 - successRate) {
    metrics.increment(metricNameFail);
    console.log(`❌ ${metricNameFail}`);
    throw new Error('Simulated failure');
  }
  await new Promise((res) => setTimeout(res, delay));
  metrics.increment(metricNameSuccess);
  console.log(`✅ ${metricNameSuccess}`);
};

// List of user actions to simulate
const routes = [
  'login', 'logout', 'register', 'delete', 'update', 'get', 'profile',
  'settings', 'friends', 'follow', 'unfollow', 'notifications', 'search',
  'upload', 'download', 'reset-password', 'verify-email', 'change-password',
  'feedback', 'support',
];

// Define dynamic POST routes
routes.forEach((action) => {
  app.post(`/user/${action}`, async (req, res) => {
    const span = tracer.startSpan(`user.${action}`);
    const start = Date.now();

    try {
      await simulate(`user.${action}.success`, `user.${action}.failed`, 0.8, 300);
      res.status(200).json({ message: `${action} successful` });
    } catch (err) {
      res.status(500).json({ message: `${action} failed` });
    } finally {
      const elapsed = Date.now() - start;
      metrics.timing(`user.${action}.latency`, elapsed);
      console.log(`⏱️  [Latency] user.${action}: ${elapsed}ms`);
      span.finish();
    }
  });
});

app.listen(3001, () => {
  console.log('🚀 User Service running on http://localhost:3001');
});
