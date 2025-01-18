/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mercadopago = require('mercadopago');
const util = require('util');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
mercadopago.configure({
  sandbox: false, // si estás probando en el ambiente de pruebas de MercadoPago
  // access_token: 'APP_USR-8509403097579740-051601-e1c674ca876a173dd84e3b63a2ac3d6e-1375519379'
  
  //produccion
  access_token: 'APP_USR-3967596500928054-020703-58d66af4da4675b3a2c2c5ed3d5ca6d2-94662750'
  // aquí debes colocar tu Client Secret


  // para test developer
  //  access_token: 'APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976'

  //cuenta ro
  // access_token: 'APP_USR-2354878281626192-122521-a41bf257a1dd84f3f5edc648a49d806a-1042694053'
});

const nodemailer = require('nodemailer');
// const axios = require('axios');
const readFile = util.promisify(fs.readFile);
const usersArray = [];



const express = require('express');
const bodyParser = require('body-parser');
// const { default: axios } = require('axios');

const app = express();

// Middleware para procesar solicitudes con cuerpo JSON
app.use(bodyParser.json());
// eslint-disable-next-line no-unused-vars
const id_ticket = null;
module.exports = (options = {}) => {
  return async context => {
    // console.log('Webhook BODY', context.data);

    // console.log('Webhook data:', context.data);
    // console.log('Webhook query:', context);

    let req = context.params;

    console.log('Webhook:', req);

    // console.log('Webhook:', req);


    if (req.query.topic == 'merchant_order') {
      console.log('Orden de compra');
      let merchant_order = await mercadopago.merchant_orders.get(req.query.id);
      // console.log('merchant_order', merchant_order)
      // let totalCompra = merchant_order.response.total_amount;
      // let totalPadreCompra = 0;

      // pago.items.forEach(item => {
      //   totalPadreCompra += item.unit_price;
      // }

      
      
      console.log('merchant_order', merchant_order);
    
      let payments = merchant_order.response.payments;

      console.log('payments', payments.id);

      let paymentId = payments.id;
      let generarEntrega = false;

      for (let index = 0; index < payments.length; index++) {
        const payment = payments[index];
        
        // if(payment.status == 'approved' && payment.status_detail == 'accredited' && totalCompra == totalPadreCompra && merchant_order.response.status == 'closed' && merchant_order.response.payments[index].status == 'approved' && merchant_order.response.payments[index].status_detail == 'accredited' && merchant_order.response.external_reference == external_reference_variable){
        if(payment.status == 'approved' && payment.status_detail == 'accredited'){
          console.log('El pago del patrocinio fue exitoso, HOLAAA!!!');


          //hace un post a la api de tu sistema para que actualice el estado del pedido a pagado y envie el mail de confirmacion de compra
          let idid = merchant_order.response.external_reference.replace(/"/g, '');
          console.log('merchant_order.response', idid);



          let pago = await context.app.service('payments').get(merchant_order.response.external_reference.replace(/"/g, ''));
          // console.log('estadoooooooooooooo', pago.estado);

          console.log('PAGO PAGO', pago);

          // if(pago.estado == !'aprobado'){
          // console.log('entroooooooooooooooooooooooooooooooo
          try {
            

           

            //si pago es pendiente 

            if(pago.estado == 'pendiente'){
                console.log('entroooooooooooooooooooooooooooooooo');
                await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
                    estado: 'aprobado',
                    // id_orden: external_reference_variable
                });
                await context.app.service('patrocinadores').create({
                    usuario: pago.id_comprador,
                    monto: pago.monto,
                    fecha: new Date()
                });
                console.log('pago prosesado correctamente, nuevo patrocinador agregado');
            }

            

        
          } catch (error) {
            console.log('error', error);
          }
        }
        if(payment.status == 'rejected'  ){
          console.log('El pago fue rechazado');

          try {
            let paymentNew = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
              estado: 'rechazado',
              // id_orden: external_reference_variable
            });
            // console.log('paymentNew', paymentNew);
          } catch (error) {
            console.log('error', error);
          }
        }



        if(payment.status == 'pending' ){
          console.log('El pago esta pendiente');
          try {
            let paymentNew = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
              estado: 'pendiente',
              // id_orden: external_reference_variable
            });
            // console.log('paymentNew', paymentNew);
          } catch (error) {
            console.log('error', error);
          }
        }
        //in_process
        if(payment.status == 'in_process' ){
          console.log('El pago esta en proceso');
          try {
            let paymentNew = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
              estado: 'en proceso',
              // id_orden: external_reference_variable
            });
            console.log('paymentNew', paymentNew);
          }
          catch (error) {
            console.log('error', error);
          }

        }
      }

    }


    

    return context;
  };
};
