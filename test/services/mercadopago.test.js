const assert = require('assert');
const app = require('../../src/app');

describe('\'mercadopago\' service', () => {
  it('registered the service', () => {
    const service = app.service('mercadopago');

    assert.ok(service, 'Registered the service');
  });
});
