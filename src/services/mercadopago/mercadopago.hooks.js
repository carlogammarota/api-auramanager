

const changePayments = require('../../hooks/change-payments');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [changePayments()],
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
