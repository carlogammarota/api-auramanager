const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');
const orderId = require("../../hooks/order-id");
module.exports = {
  before: {
    all: [],
    find: [],
    get: [

    ],
    create: [
      authenticate('jwt'),
      checkPermissions({
        roles: [ 'admin' ]
      }),
      orderId()
    ],
    update: [],
    patch: [
      // async context => {
      //   //QUE ESTE VERIFICANDO SI EL PAGO ESTA APROBADO Y SI LA ENTRADA NO FUE GENERADA

      //   let id = context.data.id_user.replace(/"/g, '');
      //   console.log('Generar entrada hook', id);
      //   //si el pago esta aprobado se genera la entrada una vez sola de lo contrario no se genera

      //   //comprobar si el pago esta aprobado 
      //   let pago = await context.app.service('payments').get(id);

        




      //   //comprobar si en la variable pago.estado esta el estado
      //   console.log('pagooooooooooooo', pago);
      //   // if(pago.estado == 'aprobado'){
      //   //   console.log('El pago esta aprobado');

        
      //   //   //comprobar si la entrada ya fue generada para no generarla de nuevo
      //   //   let entrada = await context.app.service('entradas').find({ 
      //   //     query: {
      //   //       id_pago: id
      //   //     }
      //   //   });

      //   //   if(entrada.total == 0){
      //   //     console.log('Entrada no generada');
      //   //     //crear servicio generar entrada y que devuelva el id de la entrada
      //   //     let entrada = await context.app.service('entradas').create({
      //   //       dni: null,
      //   //       estado: 'no-ingreso',
      //   //       consumision: true,
      //   //       id_pago: id
      //   //     });
      //   //   } else{
      //   //     console.log('Entrada ya generada');
      //   //   }
      //   // }
        
        

      //   return context;
      // }

    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    // get: [
      
    //   async context => {
    //     console.log('HOOK PAYMENT GET');
    //     console.log('context', context.id);
    //     console.log('context.result.productos', context.result.productos);
    //     //buscar en la coleccion entradas y devolver todos las entradas que tengan el mismo paymentId que el id de la entrada
    //     let entradas = await context.app.service('entradas').find({
    //       query: {
    //         paymentId: context.id
    //       }
    //     });

    //     console.log('entradas', entradas.data);

    //     entradas =  entradas.data

    //     let linkEntradas = []


        
    //     for (let index = 0; index < context.result.productos.length; index++) {
    //       const ticket = entradas[index];
    //       console.log('ticket', ticket);
    //       let idTicket = ticket._id;
    //       let idNumero = index;
    //       let link = `https://api.charlygproducciones.com/descargar-entradas/${idTicket}`;
    //       // let link = `http://192.168.1.8:5050/descargar-entradas/${idTicket}`;

    //       linkEntradas.push({
    //         link: link,
    //         idTicket: idTicket,
    //         idNumero: idNumero + 1
    //       });
          
    //     }




    //     context.result.linkEntradas = linkEntradas;

    //     return context;

        

    //   }
    // ],
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
