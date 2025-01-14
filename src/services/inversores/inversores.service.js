// Initializes the `inversores` service on path `/inversores`
const { Inversores } = require('./inversores.class');
const createModel = require('../../models/inversores.model');
const hooks = require('./inversores.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/inversores', new Inversores(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('inversores');

  service.hooks(hooks);
};
