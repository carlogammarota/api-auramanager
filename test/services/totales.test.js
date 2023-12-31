const assert = require('assert');
const app = require('../../src/app');

describe('\'totales\' service', () => {
  it('registered the service', () => {
    const service = app.service('totales');

    assert.ok(service, 'Registered the service');
  });
});
