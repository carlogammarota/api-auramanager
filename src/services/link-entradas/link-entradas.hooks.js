

module.exports = {
  before: {
    all: [],
    find: [],
         get: [
      
      async context => {
        console.log('HOOK PAYMENT GET');
        console.log('context', context.id);
        // console.log('context.result.productos', context.result);
        //buscar en la coleccion entradas y devolver todos las entradas que tengan el mismo paymentId que el id de la entrada
        let entradas = await context.app.service('entradas').find({
          query: {
            paymentId: context.id
          }
        });

        console.log('entradas', entradas.data);

        // entradas =  entradas.data

        let linkEntradas = []


        
        for (let index = 0; index < entradas.data.length; index++) {
          const ticket = entradas.data[index];
          console.log('ticket', ticket);
          let idTicket = ticket._id;
          let idNumero = index;
          let link = `https://apiauramanager.alguientiene.com/descargar-entradas/${idTicket}`;
          // let link = `http://192.168.1.8:5050/descargar-entradas/${idTicket}`;

          linkEntradas.push({
            link: link,
            idTicket: idTicket,
            idNumero: idNumero + 1
          });
          
        }




        context.result = {
          linkEntradas: linkEntradas
        };

        return context;

        

      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
   
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
