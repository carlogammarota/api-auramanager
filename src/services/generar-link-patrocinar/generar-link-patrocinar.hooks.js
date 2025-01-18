const { authenticate } = require('@feathersjs/authentication').hooks;
const patrocinar = require('../../hooks/patrocinar');
const checkPermissions = require('feathers-permissions');
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt'), checkPermissions({
      roles: ['admin']
    }),],
    patch: [authenticate('jwt'), checkPermissions({
      roles: ['admin']
    }),],
    remove: [authenticate('jwt'), checkPermissions({
      roles: ['admin']
    }),]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      patrocinar()
    ],
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
