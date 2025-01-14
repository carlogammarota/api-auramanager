const assert = require('assert');
const app = require('../../src/app');

describe('\'patrocinadores\' service', () => {
  it('registered the service', () => {
    const service = app.service('patrocinadores');

    assert.ok(service, 'Registered the service');
  });
});
