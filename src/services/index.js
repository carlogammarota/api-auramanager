const users = require('./users/users.service.js');
const entradas = require('./entradas/entradas.service.js');
const mercadopago = require('./mercadopago/mercadopago.service.js');
const generarLink = require('./generar-link/generar-link.service.js');
const payments = require('./payments/payments.service.js');
const descargarEntradas = require('./descargar-entradas/descargar-entradas.service.js');
const linkEntradas = require('./link-entradas/link-entradas.service.js');
const ventas = require('./ventas/ventas.service.js');
const ventasAll = require('./ventas-all/ventas-all.service.js');
const totales = require('./totales/totales.service.js');
const eventos = require('./eventos/eventos.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(entradas);
  app.configure(mercadopago);
  app.configure(generarLink);
  app.configure(payments);
  app.configure(descargarEntradas);
  app.configure(linkEntradas);
  app.configure(ventas);
  app.configure(ventasAll);
  app.configure(totales);
  app.configure(eventos);
};
