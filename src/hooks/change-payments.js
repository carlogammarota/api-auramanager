// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const mercadopago = require('mercadopago');

const axios = require('axios');
mercadopago.configure({
  sandbox: true, // si estás probando en el ambiente de pruebas de MercadoPago
  access_token: 'APP_USR-2392316560626810-032101-51403a4ba528e4cb121e2d78218b8df1-1335371219'
  // aquí debes colocar tu Client Secret
});



const express = require('express');
const bodyParser = require('body-parser');
// const { default: axios } = require('axios');

const app = express();

// Middleware para procesar solicitudes con cuerpo JSON
app.use(bodyParser.json());
// eslint-disable-next-line no-unused-vars
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
      
      console.log("merchant_order", merchant_order)
    
      let payments = merchant_order.response.payments;

      console.log("payments", payments)

      for (let index = 0; index < payments.length; index++) {
        const payment = payments[index];
        // if(payment.status == 'approved' && payment.status_detail == 'accredited' && totalCompra == totalPadreCompra && merchant_order.response.status == 'closed' && merchant_order.response.payments[index].status == 'approved' && merchant_order.response.payments[index].status_detail == 'accredited' && merchant_order.response.external_reference == external_reference_variable){
        if(payment.status == 'approved' && payment.status_detail == 'accredited'){
          console.log('El pago fue exitoso, HOLAAA!!!');
          // let cliente = await axios.get('https://api.mercadolibre.com/users/'+ merchant_order.response.payer.id);

         

          // console.log(cliente.data);

          // console.log

          //hace un post a la api de tu sistema para que actualice el estado del pedido a pagado y envie el mail de confirmacion de compra
          let idid = merchant_order.response.external_reference.replace(/"/g, '');
          console.log('merchant_order.response', idid);

          //  let paymentNew = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
          //    estado: 'aprovado',
          //    // id_orden: external_reference_variable
          //  })

          // console.log('paymentNew', paymentNew);

          let pago = await context.app.service('payments').get(merchant_order.response.external_reference.replace(/"/g, ''));
          // console.log('estadoooooooooooooo', pago.estado);

          // if(pago.estado == !'aprovado'){
          // console.log('entroooooooooooooooooooooooooooooooo
          try {
            let paymentNew = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
              estado: 'aprovado',
              // console.log(estado)
              // id_orden: external_reference_variable
            });

            let getPayment = await context.app.service('payments').get(merchant_order.response.external_reference.replace(/"/g, ''));
            console.log('getPayment', getPayment.id_comprador);
             //hacer un patch a la api que actualize la cuenta a premium
            let premium = await context.app.service('users').patch( getPayment.id_comprador,{
              premium: true
            })


            // console.log('paymentNew', paymentNew);
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
