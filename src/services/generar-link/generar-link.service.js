// Initializes the `generar-link` service on path `/generar-link`
const { GenerarLink } = require('./generar-link.class');
const hooks = require('./generar-link.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/generar-link', new GenerarLink(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('generar-link');

  service.hooks(hooks);
};
