const express = require('express');
// const tracer = require('../../lib/datadog/tracer');
const tracer = require('dd-trace').init();
const metrics = require('../../lib/datadog/metrics');
const app = express();

app.post('/user/login', async (req, res) => {
  const span = tracer.startSpan('user.login');
  try {
    const random = Math.random();
    if (random < 0.3) throw new Error('Login failed');
    if (random < 0.5) await new Promise(r => setTimeout(r, 1000));

    metrics.increment('user.login.success');
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    metrics.increment('user.login.failed');
    res.status(401).json({ message: 'Login failed' });
  } finally {
    span.finish();
  }
});

app.listen(3001, () => console.log('User Service on 3001'));