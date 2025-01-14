// Initializes the `publicas` service on path `/publicas`
const { Publicas } = require('./publicas.class');
const createModel = require('../../models/publicas.model');
const hooks = require('./publicas.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/publicas', new Publicas(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('publicas');

  service.hooks(hooks);
};
