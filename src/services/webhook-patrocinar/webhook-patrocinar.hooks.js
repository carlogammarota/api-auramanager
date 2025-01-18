
const confirmarPatrocinio = require('../../hooks/confirmarPatrocinio');
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [confirmarPatrocinio()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
