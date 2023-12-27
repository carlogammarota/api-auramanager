const short = require('short-uuid');
const shortUUID = short();

function generateOrderId() {
  const now = new Date();

  // year = sum of all digits of current year
  const year = now.getFullYear().toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000)) + 1; // Adjusted to 1-365
  // 4 random charts, only letters mayus
  const randomChars = shortUUID.generate().toUpperCase().replace(/[^A-Z]/g, '').substr(0, 4);

  const orderId = `${year}${dayOfYear.toString().padStart(3, '0')}-${randomChars}`;
  return orderId;
}

module.exports = function (options = {}) {
  return async (context) => {
    context.data.orderId = generateOrderId()
    return context;
  };
};
