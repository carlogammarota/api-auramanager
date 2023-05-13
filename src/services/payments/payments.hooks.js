

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      async context => {
        console.log('Generar entrada hook', context.result);
        //si el pago esta aprobado se genera la entrada una vez sola de lo contrario no se genera
        
        //comprobar si la entrada ya fue generada para no generarla de nuevo
        let entrada = await context.app.service('entradas').find({ 
          query: {
            id_pago: context.result.id
          }
        });

        if(entrada.total == 0){
          console.log('Entrada no generada');
          //crear servicio generar entrada y que devuelva el id de la entrada
          let entrada = await context.app.service('entradas').create({
            dni: null,
            estado: 'no-ingreso',
            consumision: true,
            id_pago: context.result.id
          });
        }else{
          console.log('Entrada ya generada');
        }
        

        return context;
      }

    ],
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
