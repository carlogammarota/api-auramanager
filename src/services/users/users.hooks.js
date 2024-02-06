const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;



const isOwner = async (context) => {
  // const user_id = context.params.user._id.toString()
  const user_id = context.params.user
  const user_editar = context.id; // Id del evento que se está intentando editar
  console.log(user_editar);
  // const user_id = context.id; // Id del evento que se está intentando editar

  // console.log(context.params.user._id.toString());

  // console.log(user_id);
  // console.log(eventId);
  // Obtener el evento de la base de datos
  const user = await context.app.service('users').get(user_id);

  // console.log(user);


  // Verificar si el usuario es el propietario del usuario
  if (user._id.toString() !== user_editar) {
    throw new Error('No tienes permisos para editar este usuario.');
  }
  return context;
};


module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password') ],
    update: [ hashPassword('password'),  authenticate('jwt'), isOwner ],
    patch: [ hashPassword('password'),  authenticate('jwt'), isOwner ],
    remove: [ authenticate('jwt'), isOwner ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
