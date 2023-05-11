const assert = require('assert');
const app = require('../../src/app');

describe('\'entradas\' service', () => {
  it('registered the service', () => {
    const service = app.service('entradas');

    assert.ok(service, 'Registered the service');
  });
});
