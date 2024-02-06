const { authenticate } = require('@feathersjs/authentication').hooks;


const isOwner = async (context) => {
  const user_id = context.params.user._id.toString()
  const eventId = context.id; // Id del evento que se está intentando editar

  console.log(context.params.user._id.toString());

  // console.log(user_id);
  // console.log(eventId);
  // Obtener el evento de la base de datos
  const evento = await context.app.service('eventos').get(eventId);

  console.log(evento);

  // Verificar si el usuario es el propietario del evento
  if (evento.user_id.toString() !== user_id) {
    throw new Error('No tienes permisos para editar este evento.');
  }

  return context;
};

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [isOwner], // Aplicar el hook isOwner antes de la actualización
    patch: [isOwner], // Aplicar el hook isOwner antes del parche
    remove: [isOwner], // Aplicar el hook isOwner antes de la eliminación
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
