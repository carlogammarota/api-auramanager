const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');
const mongoose = require('./mongoose');
const mongodb = require('./mongodb');

const app = express(feathers());

// Load app configuration
app.configure(configuration());

// Enable security, CORS, compression, favicon, and body parsing
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// **Ruta de archivos estáticos de entradas**
// Asegúrate de que la ruta de acceso a la carpeta "entradas" sea correcta
const entradasPath = path.join(__dirname, '../entradas'); // Ajusta esta ruta si es necesario
app.use('/entradas_generadas', express.static(entradasPath));

// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configurar servicios y otras dependencias
app.configure(mongoose);
app.configure(mongodb);

// Configura otros middleware (ver middleware/index.js)
app.configure(middleware);
app.configure(authentication);

// Configura los servicios (ver services/index.js)
app.configure(services);

// Configura los canales de eventos (ver channels.js)
app.configure(channels);

// Configura el middleware para 404s y el controlador de errores
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
