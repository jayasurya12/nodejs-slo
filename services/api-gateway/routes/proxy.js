const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/order', async (req, res) => {
  const response = await axios.post('http://localhost:3002/order/create');
  res.json(response.data);
});

module.exports = router;
