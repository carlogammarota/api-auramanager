/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mercadopago = require('mercadopago');
axios = require('axios');
mercadopago.configure({
  sandbox: false, // si estás probando en el ambiente de pruebas de MercadoPago

  // access_token: 'APP_USR-8509403097579740-051601-e1c674ca876a173dd84e3b63a2ac3d6e-1375519379'


  // //produccion
  // access_token: 'APP_USR-114968102990097-051422-4304eafc70b7b7cda809677af7acd94a-94662750'
  


    // para test
    access_token: 'APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976'
  
  // aquí debes colocar tu Client Secret
});


const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware para procesar solicitudes con cuerpo JSON
app.use(bodyParser.json());


// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // console.log('data', context.data);
    console.log('Generar pago', context.result);


    let res = await context.app.service('payments').create({
      ticket_generado: false,
      cantidadTickets: context.result.cantidad,
      email: context.result.email,
    });

    // let id = JSON.stringify(res._id);
    // let id = JSON.parse(JSON.stringify(res._id));
    // console.log('id', id.toString());
    // // this.toString

    external_reference_variable = res._id;

    let cantidad = context.result.cantidad;
    // console.log('cantidad', cantidad);
    // eslint-disable-next-line no-unused-vars
    let email = context.result.email;

    let entradas = [];

    for (let i = 0; i < cantidad; i++) {
      entradas.push({
        'id': i,
        'title': 'Ticket Online',
        'description': 'Se Realiza en Club Balumba',
        'quantity': 1,
        'currency_id': 'ARS',
        'unit_price': 2000
      });
    }



    



    // let entradas = [{
    //   'id': 1,
    //   'title': 'Cuenta Premium',
    //   'description': 'Tendrás la oportunidad de publicar más de 5 productos en nuestra tienda en línea',
    //   'quantity': 1,
    //   'currency_id': 'ARS',
    //   'unit_price': 10
    // }];
    
    

    const preference  = {
      // items: [
      //   {
      //     id: '1',
      //     title: 'descripcionProducto',
      //     quantity: 1,
      //     currency_id: 'ARS',
      //     unit_price: 1000
      //   },
      //   {
      //     id: '2',
      //     title: 'otraProducto',
      //     quantity: 1,
      //     currency_id: 'ARS',
      //     unit_price: 1000
      //   },
      // ],
      // items: context.data.items,
      items: entradas,

      // payer: {
      //   email: 'leo_elgigante_22@hotmail.com'
      // },
      back_urls: {
        // success: 'https://alguientiene.com',
        pending: 'https://alguientiene.com',
        // external_reference_variable
        failure: 'https://alguientiene.com',
        //este es para descargar la entrada de una
        // success: 'https://apiauramanager.alguientiene.com/descargar-entradas/' + external_reference_variable,
        //este link retorna a la web gracias por su compra con la posibilidad de descargar las entrada
        success: 'http://localhost:8080/gracias/' + external_reference_variable,
        pending: 'https://auramanager.alguientiene.com/gracias/' + external_reference_variable,
        failure: 'https://auramanager.alguientiene.com/gracias/' + external_reference_variable
      },
      auto_return: 'approved',
      external_reference: JSON.stringify(res._id),
      // notification_url: 'https://d004-170-51-93-104.sa.ngrok.io/mercadopago',

      //produccion
      // notification_url: 'https://apiauramanager.alguientiene.com/mercadopago',


      //local test
      notification_url: 'https://1744-2800-810-59c-9041-543c-e48-158-dbb7.ngrok-free.app/mercadopago',



      // notification_url: 'https://api.alguientiene.com/mercadopago',
    };

    let linkDePago = await mercadopago.preferences.create(preference);
    context.result.linkDePago = linkDePago.response.init_point  ;

    console.log('context.result', context.result);

    //si es producto
    // let payment = await context.app.service('payments').patch(external_reference_variable ,{  
    //   id_comprador: context.data.id_comprador,
    //   id_vendedor: pago.payer.email,
    //   type: "producto",
    //   productos: context.result.items,
    //   linkDePago: linkDePago.response.init_point,
    //   estado: 'pendiente',
    //   // id_orden: external_reference_variable      
    // });

    //si es premium
    let payment = await context.app.service('payments').patch(external_reference_variable ,{  
      id_comprador: context.data.id_comprador,
      id_vendedor: 'no se sabe',
      type: 'premium',
      productos: entradas,
      linkDePago: linkDePago.response.init_point,
      estado: 'pendiente',
      ticket_generado: false,
      id_user: JSON.stringify(res._id),
      cantidadTickets: cantidad,
      email: email,
      participantes: context.result.participantes,

      // id_orden: external_reference_variable      
    });

    // if(payment){



    console.log('payment', payment);

    context.result = linkDePago.body.init_point;


    return context;
  };
};
