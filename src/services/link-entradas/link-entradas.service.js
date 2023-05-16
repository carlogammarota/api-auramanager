// Initializes the `link-entradas` service on path `/link-entradas`
const { LinkEntradas } = require('./link-entradas.class');
const hooks = require('./link-entradas.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/link-entradas', new LinkEntradas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('link-entradas');

  service.hooks(hooks);
};
