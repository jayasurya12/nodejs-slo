const express = require('express');
// const tracer = require('../../lib/datadog/tracer');
const tracer = require('dd-trace').init();
const metrics = require('../../lib/datadog/metrics');
const app = express();

app.get('/inventory/check', async (req, res) => {
  const span = tracer.startSpan('inventory.check');
  try {
    const random = Math.random();
    if (random < 0.2) throw new Error('Inventory DB down');
    if (random < 0.5) await new Promise(r => setTimeout(r, 700));

    metrics.increment('inventory.success');
    res.status(200).json({ available: true });
  } catch (err) {
    metrics.increment('inventory.failed');
    res.status(503).json({ available: false });
  } finally {
    span.finish();
  }
});

app.listen(3003, () => console.log('Inventory Service on 3003'));