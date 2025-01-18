// Initializes the `webhook-patrocinar` service on path `/webhook-patrocinar`
const { WebhookPatrocinar } = require('./webhook-patrocinar.class');
const hooks = require('./webhook-patrocinar.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/webhook-patrocinar', new WebhookPatrocinar(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('webhook-patrocinar');

  service.hooks(hooks);
};
