const assert = require('assert');
const app = require('../../src/app');

describe('\'inversores\' service', () => {
  it('registered the service', () => {
    const service = app.service('inversores');

    assert.ok(service, 'Registered the service');
  });
});
