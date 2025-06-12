const express = require('express');
const app = express();
const proxyRoutes = require('./routes/proxy');
const healthRoutes = require('./routes/health');
const metricsRoutes = require('./routes/metrics');

app.use('/api', proxyRoutes);
app.use('/health', healthRoutes);
app.use('/metrics', metricsRoutes);

app.listen(3000, () => console.log('API Gateway on 3000'));
