const assert = require('assert');
const app = require('../../src/app');

describe('\'webhook-patrocinar\' service', () => {
  it('registered the service', () => {
    const service = app.service('webhook-patrocinar');

    assert.ok(service, 'Registered the service');
  });
});
