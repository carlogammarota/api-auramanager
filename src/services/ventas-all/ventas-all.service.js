// Initializes the `ventas-all` service on path `/ventas-all`
const { VentasAll } = require('./ventas-all.class');
const hooks = require('./ventas-all.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ventas-all', new VentasAll(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ventas-all');

  service.hooks(hooks);
};
