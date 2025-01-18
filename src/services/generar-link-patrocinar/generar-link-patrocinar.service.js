// Initializes the `generar-link-patrocinar` service on path `/generar-link-patrocinar`
const { GenerarLinkPatrocinar } = require('./generar-link-patrocinar.class');
const hooks = require('./generar-link-patrocinar.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/generar-link-patrocinar', new GenerarLinkPatrocinar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('generar-link-patrocinar');

  service.hooks(hooks);
};
