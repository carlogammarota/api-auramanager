const assert = require('assert');
const app = require('../../src/app');

describe('\'generar-link\' service', () => {
  it('registered the service', () => {
    const service = app.service('generar-link');

    assert.ok(service, 'Registered the service');
  });
});
