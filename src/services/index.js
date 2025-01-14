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

// Necesitas una ruta para descargar las entradas generadas
// Servir carpeta de entradas
const path = require('path');
const express = require('express');


const publicas = require('./publicas/publicas.service.js');


const inversores = require('./inversores/inversores.service.js');


const patrocinadores = require('./patrocinadores/patrocinadores.service.js');


module.exports = function (app) {
  // Configura todos los servicios que usas
  // Ruta para servir archivos estáticos desde la carpeta 'entradas' en el directorio raíz

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


  app.configure(publicas);
  app.configure(inversores);
  app.configure(patrocinadores);
};
