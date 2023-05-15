/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mercadopago = require('mercadopago');
axios = require('axios');
mercadopago.configure({
  sandbox: false, // si estás probando en el ambiente de pruebas de MercadoPago
  access_token: 'APP_USR-114968102990097-051422-4304eafc70b7b7cda809677af7acd94a-94662750'
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
    });

    // let id = JSON.stringify(res._id);
    // let id = JSON.parse(JSON.stringify(res._id));
    // console.log('id', id.toString());
    // // this.toString

    external_reference_variable = res._id;
    

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
      items: context.data.items,
      payer: {
        email: 'leo_elgigante_22@hotmail.com'
      },
      back_urls: {
        // success: 'https://alguientiene.com',
        pending: 'https://alguientiene.com',
        // external_reference_variable
        failure: 'https://alguientiene.com',
        success: 'https://apiauramanager.alguientiene.com/descargar-entradas/' + external_reference_variable,
        // pending: 'https://cb51-190-30-39-222.sa.ngrok.io/pago-pendiente',
        // failure: 'https://cb51-190-30-39-222.sa.ngrok.io/pago-fallido'
      },
      auto_return: 'approved',
      external_reference: JSON.stringify(res._id),
      // notification_url: 'https://d004-170-51-93-104.sa.ngrok.io/mercadopago',
      notification_url: 'https://apiauramanager.alguientiene.com/mercadopago',
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
      id_vendedor: preference.payer.email,
      type: 'premium',
      productos: context.result.items,
      linkDePago: linkDePago.response.init_point,
      estado: 'pendiente',
      ticket_generado: false,
      id_user: JSON.stringify(res._id)

      // id_orden: external_reference_variable      
    });

    // if(payment){



    console.log('payment', payment);

    context.result = linkDePago.body.init_point;


    return context;
  };
};
