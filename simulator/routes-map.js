module.exports = [
  // User Service Routes
  { host: 'user-service', port: 3001, path: '/user/login', method: 'post' },
  { host: 'user-service', port: 3001, path: '/user/logout', method: 'post' },
  { host: 'user-service', port: 3001, path: '/user/register', method: 'post' },
  { host: 'user-service', port: 3001, path: '/user/delete', method: 'post' },
  { host: 'user-service', port: 3001, path: '/user/profile', method: 'post' },
  { host: 'user-service', port: 3001, path: '/user/settings', method: 'post' },
  { host: 'user-service', port: 3001, path: '/user/friends', method: 'post' },
  { host: 'user-service', port: 3001, path: '/user/verify-email', method: 'post' },

  // Order Service Routes
  { host: 'order-service', port: 3002, path: '/order/create', method: 'post' },
  { host: 'order-service', port: 3002, path: '/order/update', method: 'post' },
  { host: 'order-service', port: 3002, path: '/order/delete', method: 'post' },
  { host: 'order-service', port: 3002, path: '/order/status', method: 'get' },
  { host: 'order-service', port: 3002, path: '/order/list', method: 'get' },

  // Inventory Service Routes
  { host: 'inventory-service', port: 3003, path: '/inventory/check', method: 'get' },
  { host: 'inventory-service', port: 3003, path: '/inventory/add', method: 'post' },
  { host: 'inventory-service', port: 3003, path: '/inventory/remove', method: 'post' },
  { host: 'inventory-service', port: 3003, path: '/inventory/update', method: 'post' },
  { host: 'inventory-service', port: 3003, path: '/inventory/list', method: 'get' },
  { host: 'inventory-service', port: 3003, path: '/inventory/status', method: 'get' },

  // Gateway or Misc Routes (optional examples)
  { host: 'api-gateway', port: 3000, path: '/health', method: 'get' },
  { host: 'api-gateway', port: 3000, path: '/route/info', method: 'get' }
];
