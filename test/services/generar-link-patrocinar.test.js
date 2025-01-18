const assert = require('assert');
const app = require('../../src/app');

describe('\'generar-link-patrocinar\' service', () => {
  it('registered the service', () => {
    const service = app.service('generar-link-patrocinar');

    assert.ok(service, 'Registered the service');
  });
});
