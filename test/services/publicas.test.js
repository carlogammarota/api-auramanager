const assert = require('assert');
const app = require('../../src/app');

describe('\'publicas\' service', () => {
  it('registered the service', () => {
    const service = app.service('publicas');

    assert.ok(service, 'Registered the service');
  });
});
