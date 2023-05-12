// Initializes the `mercadopago` service on path `/mercadopago`
const { Mercadopago } = require('./mercadopago.class');
const hooks = require('./mercadopago.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mercadopago', new Mercadopago(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mercadopago');

  service.hooks(hooks);
};
