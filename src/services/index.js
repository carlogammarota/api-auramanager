const users = require('./users/users.service.js');
const entradas = require('./entradas/entradas.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(entradas);
};
