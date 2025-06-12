const express = require('express');
const tracer = require('../../lib/datadog/tracer');
const metrics = require('../../lib/datadog/metrics');
const app = express();

app.use(express.json());

const simulate = async (metricNameSuccess, metricNameFail, successRate = 0.7, delay = 500) => {
  const random = Math.random();
  if (random < 1 - successRate) {
    metrics.increment(metricNameFail);
    throw new Error('Simulated failure');
  }
  await new Promise(r => setTimeout(r, delay));
  metrics.increment(metricNameSuccess);
};

const routes = [
  'login', 'logout', 'register', 'delete', 'update', 'get', 'profile',
  'settings', 'friends', 'follow', 'unfollow', 'notifications', 'search',
  'upload', 'download', 'reset-password', 'verify-email', 'change-password',
  'feedback', 'support'
];

routes.forEach((action) => {
  app.post(`/user/${action}`, async (req, res) => {
    const span = tracer.startSpan(`user.${action}`);
    try {
      await simulate(`user.${action}.success`, `user.${action}.failed`, 0.8, 300);
      res.status(200).json({ message: `${action} successful` });
    } catch (err) {
      res.status(500).json({ message: `${action} failed` });
    } finally {
      span.finish();
    }
  });
});

app.listen(3001, () => console.log('User Service on 3001'));