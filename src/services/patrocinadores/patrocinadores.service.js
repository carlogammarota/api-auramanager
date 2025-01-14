// Initializes the `patrocinadores` service on path `/patrocinadores`
const { Patrocinadores } = require('./patrocinadores.class');
const createModel = require('../../models/patrocinadores.model');
const hooks = require('./patrocinadores.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/patrocinadores', new Patrocinadores(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('patrocinadores');

  service.hooks(hooks);
};
