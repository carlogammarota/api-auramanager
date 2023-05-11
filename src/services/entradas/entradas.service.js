// Initializes the `entradas` service on path `/entradas`
const { Entradas } = require('./entradas.class');
const createModel = require('../../models/entradas.model');
const hooks = require('./entradas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/entradas', new Entradas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('entradas');

  service.hooks(hooks);
};
