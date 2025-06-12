module.exports = [
    { host: 'order-service', port: 3002, path: '/order/create', method: 'post' },
    { host: 'user-service', port: 3001, path: '/user/login', method: 'post' },
    { host: 'inventory-service', port: 3003, path: '/inventory/check', method: 'get' },
    // ... Add 20+ routes
  ];