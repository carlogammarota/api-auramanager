const assert = require('assert');
const app = require('../../src/app');

describe('\'ventas\' service', () => {
  it('registered the service', () => {
    const service = app.service('y');

    assert.ok(service, 'Registered the service');
  });
});
