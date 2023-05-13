const users = require('./users/users.service.js');
const entradas = require('./entradas/entradas.service.js');
const mercadopago = require('./mercadopago/mercadopago.service.js');
const generarLink = require('./generar-link/generar-link.service.js');
const payments = require('./payments/payments.service.js');
const descargarEntradas = require('./descargar-entradas/descargar-entradas.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(entradas);
  app.configure(mercadopago);
  app.configure(generarLink);
  app.configure(payments);
  app.configure(descargarEntradas);
};
