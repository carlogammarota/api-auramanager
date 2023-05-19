const { authenticate } = require('@feathersjs/authentication').hooks;

const generarEntrada = require('../../hooks/generar-entrada');
const checkPermissions = require('feathers-permissions');

module.exports = {
  before: {
    // all: [ authenticate('jwt') ],
    find: [],
    get: [

    ],
    create: [
      authenticate('jwt'),
      checkPermissions({
        roles: [ 'admin' ]
      })
    ],
    update: [
     
    ],
    patch: [],
    remove: [
      checkPermissions({
        roles: [ 'admin' ]
      })
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [generarEntrada()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
