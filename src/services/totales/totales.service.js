// Initializes the `totales` service on path `/totales`
const { Totales } = require('./totales.class');
const hooks = require('./totales.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/totales', new Totales(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('totales');

  service.hooks(hooks);
};
