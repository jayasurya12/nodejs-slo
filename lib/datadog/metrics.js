const StatsD = require('hot-shots');
const dogstatsd = new StatsD();
module.exports = {
  increment: (key) => dogstatsd.increment(key),
  timing: (key, time) => dogstatsd.timing(key, time),
};