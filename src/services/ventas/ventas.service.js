// Initializes the `ventas` service on path `/y`
const { Ventas } = require('./ventas.class');
const createModel = require('../../models/ventas.model');
const hooks = require('./ventas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/y', new Ventas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('y');

  service.hooks(hooks);
};
