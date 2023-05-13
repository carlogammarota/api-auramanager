const assert = require('assert');
const app = require('../../src/app');

describe('\'descargar-entradas\' service', () => {
  it('registered the service', () => {
    const service = app.service('descargar-entradas');

    assert.ok(service, 'Registered the service');
  });
});
