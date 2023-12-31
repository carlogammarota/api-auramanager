const assert = require('assert');
const app = require('../../src/app');

describe('\'ventas-all\' service', () => {
  it('registered the service', () => {
    const service = app.service('ventas-all');

    assert.ok(service, 'Registered the service');
  });
});
