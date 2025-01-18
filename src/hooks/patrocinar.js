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


    //cuenta ro
    // access_token: 'APP_USR-2354878281626192-122521-a41bf257a1dd84f3f5edc648a49d806a-1042694053'
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
    console.log('Generar pago de patrocinio', context.result);


    let res = await context.app.service('payments').create({
      tipo: 'patrocinio',
      patrocinador: context.result.patrocinador,
      monto: context.result.monto,
    });

    console.log('res', res);

    let external_reference_variable = res._id;
  
    console.log('context.result.monto', context.result.monto);

    const preference  = {

      items: [
        {
          'id': '1234',
          'title': 'Patrocinio a Aura Radio',
          'description': 'Patrocinar Radio',
          'quantity': 1,
          'currency_id': 'ARS',
          'unit_price': context.result.monto
        }
      ],

      // payer: {
      //   email: 'leo_elgigante_22@hotmail.com'
      // },
      back_urls: {
        // success: 'https://alguientiene.com',
        pending: 'https://aura-producciones.com/',
        // external_reference_variable
        failure: 'https://aura-producciones.com/',
        //este es para descargar la entrada de una
        // success: 'https://api-aura.armortemplate.com/descargar-entradas/' + external_reference_variable,
        //este link retorna a la web gracias por su compra con la posibilidad de descargar las entrada
        // success: 'https://aura-producciones.com/gracias/' + external_reference_variable,
        success: 'https://aura.armortemplate.com/',
        // success: 'https://aura.armortemplate.com/' + 'gracias-patrocinar/' + external_reference_variable,
        // pending: 'https://aura-producciones.com/gracias/' + external_reference_variable,
        pending: 'https://aura.armortemplate.com/' + 'gracias-patrocinar/' + external_reference_variable,
        // failure: 'https://aura-producciones.com/gracias/' + external_reference_variable
        failure: 'https://aura.armortemplate.com/' + 'gracias-patrocinar/' + external_reference_variable
      },
      auto_return: 'approved',
      external_reference: JSON.stringify(res._id),


      notification_url: 'https://api-aura.armortemplate.com/webhook-patrocinar',

    };

    let linkDePago = await mercadopago.preferences.create(preference);
    context.result.linkDePago = linkDePago.response.init_point  ;

    console.log('context.result', context.result);


    let payment = await context.app.service('payments').patch(external_reference_variable ,{  
      type: 'patrocinar',
      linkDePago: linkDePago.response.init_point,
      estado: 'pendiente',
    });



    console.log('payment', payment);

    context.result = linkDePago.body.init_point;


    return context;
  };
};
