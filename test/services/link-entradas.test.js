const assert = require('assert');
const app = require('../../src/app');

describe('\'link-entradas\' service', () => {
  it('registered the service', () => {
    const service = app.service('link-entradas');

    assert.ok(service, 'Registered the service');
  });
});
