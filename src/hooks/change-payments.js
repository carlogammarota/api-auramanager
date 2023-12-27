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
  // access_token: 'APP_USR-3967596500928054-020703-58d66af4da4675b3a2c2c5ed3d5ca6d2-94662750'
  // aquí debes colocar tu Client Secret


  // para test
  // access_token: 'APP_USR-5050283024010521-080117-1be3cde8e474088c42201a3722be9673-1304411976'

  //cuenta ro
  access_token: 'APP_USR-2354878281626192-122521-a41bf257a1dd84f3f5edc648a49d806a-1042694053'
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
          console.log('El pago fue exitoso, HOLAAA!!!');


          // if(generarEntrega == false && paymentId == payment.id){
          //   let entrada = await context.app.service('entradas').create({
          //     dni: null,
          //     estado: 'no-ingreso',
          //     consumision: true
          //   });
          //   console.log('entrada', entrada);
          //   generarEntrega = true;
          // }



          //aca es la logica de cuando la persona ya pago y todo salio bien

          //aca se debe descargar el pdf con la entrada
          

          



          // let cliente = await axios.get('https://api.mercadolibre.com/users/'+ merchant_order.response.payer.id);

         

          // console.log(cliente.data);

          // console.log

          //hace un post a la api de tu sistema para que actualice el estado del pedido a pagado y envie el mail de confirmacion de compra
          let idid = merchant_order.response.external_reference.replace(/"/g, '');
          console.log('merchant_order.response', idid);

          //  let paymentNew = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
          //    estado: 'aprobado',
          //    // id_orden: external_reference_variable
          //  })

          // console.log('paymentNew', paymentNew);


          let pago = await context.app.service('payments').get(merchant_order.response.external_reference.replace(/"/g, ''));
          // console.log('estadoooooooooooooo', pago.estado);

          console.log('PAGO PAGO', pago);

          // if(pago.estado == !'aprobado'){
          // console.log('entroooooooooooooooooooooooooooooooo
          try {
            

            let pago = await context.app.service('payments').get(merchant_order.response.external_reference.replace(/"/g, ''));
            console.log('aca va la logica', pago.ticket_generado);
            
            //si el ticket no esta generado, se debe generar el ticket y guardarlo en la base de datos ticket true
            if(pago.ticket_generado == false){

              let paymentNew = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
                estado: 'aprobado',
              });
              console.log('pago.ticket_generado', pago.ticket_generado);
              const entradas = [];
              for (let index = 0; index < pago.cantidadTickets; index++) {
                const element = pago.cantidadTickets[index];
                console.log('element', element);
                let entrada = await context.app.service('entradas').create({
                  dni: null,
                  estado: 'no-ingreso',
                  consumicion: false,
                  paymentId: pago._id,
                  fullname: pago.participantes[index],
                  publica: "sistema mercadopago"
                //   "datos": {
                //     "nombre": "Tony",
                //     "apellido": "Guevara"
                // },
                // "publica": "sistema"
                // cantidad: pago.cantidadTickets
                });
                //guardar el id de la entrada en entradas
                entradas.push({
                  _id: entrada._id,
                  nombre: entrada.fullname

                });
              }



              //enviar email

              let linkEntradas = await context.app.service('link-entradas').get(pago._id);

              
              //     "linkEntradas": [
              //         {
              //             "link": "https://api.aura-producciones.com/descargar-entradas/646325c5ef88831bf2e0b755",
              //             "idTicket": "646325c5ef88831bf2e0b755",
              //             "idNumero": 1
              //         },
              //         {
              //             "link": "https://api.aura-producciones.com/descargar-entradas/646325c5ef88831bf2e0b757",
              //             "idTicket": "646325c5ef88831bf2e0b757",
              //             "idNumero": 2
              //         },
              //         {
              //             "link": "https://api.aura-producciones.com/descargar-entradas/646325c8ef88831bf2e0b759",
              //             "idTicket": "646325c8ef88831bf2e0b759",
              //             "idNumero": 3
              //         }
              //     ]
              // }
              let links = [];
              linkEntradas.linkEntradas.forEach(async element => {
                console.log('element', element);
                links.push(element.link);
              });

              //crear una etiqueta html div que contendra los links de las entradas
              let linksHtml = '';
              // links.forEach(element => {
              //   linksHtml += '<a href="'+element+'">Entrada</a> <br>';
              // });
              //con indice
              // for (let index = 0; index < links.length; index++) {
              //   const element = links[index];
              //   linksHtml += '<a href="'+element+'">Ticket '+index+'</a> <br>';
              // }
              // let link = 'http://localhost:5050/gracias/'+pago._id;
              let link = 'https://aura-producciones.com/gracias/'+pago._id;
              // let link = 'https://auramanager.alguientiene.com/gracias/'+pago._id;

              linksHtml += '<a href="'+link+'">Descargar Tickets </a> <br>';
        // http://localhost:8080



              console.log('pago.email', pago.email);

              

              // async function enviarCorreo() {
              //   // Configuración del transporte del correo electrónico
              //   const transporter = nodemailer.createTransport({
              //     host: 'smtp-relay.sendinblue.com',
              //     port: 587,
              //     auth: {
              //       user: 'carlo.gammarota@gmail.com',
              //       pass: 'wv5Xn140CbZDW9HR',
              //     },
              //   });

              //   var htmlstream = fs.createReadStream('./nuevo-mail.html');
              //    // Reemplaza los marcadores de posición en el HTML con datos reales
              //   let customizedHtml = htmlstream.replace(/{{XXXX-YYYY}}/g, "PROBANDO-TEST");


              //   // Detalles del correo electrónico
              //   const mailOptions = {
              //     from: 'carlo.gammarota@gmail.com',
              //     to: pago.email,
              //     subject: 'Tickets Aura - ABRACADABRA - CLUB BALUMBA',
              //     // text: 'Contenido del correo electrónico',
              //     // html: '<h1>Gracias PROBANDO por su compra de Tickets</h1> <br> <h2>a continuación un link donde podras descargar tus Tickets</h2> <br> <h1>'+linksHtml+'</h1>',
              //     html: customizedHtml,
                  
              //     // attachments: [
              //     //   // {   // Adjunto de archivo en disco
              //     //   //   filename: 'nombrearchivo.txt',
              //     //   //   path: '/ruta/al/archivo/nombrearchivo.txt'
              //     //   // },
              //     //   // {   // Adjunto de archivo desde un URL
              //     //   //   filename: 'imagen.jpg',
              //     //   //   path: 'http://ejemplo.com/imagen.jpg'
              //     //   // },
              //     //   // {   // Adjunto de archivo en Buffer
              //     //   //   filename: 'texto_buffer.txt',
              //     //   //   content: new Buffer('Contenido del archivo en texto', 'utf-8')
              //     //   // },
              //     //   {   // Adjunto de archivo como un stream
              //     //     filename: 'texto_stream.txt',
              //     //     content: fs.createReadStream('/ruta/al/archivo/texto_stream.txt')
              //     //   }
              //     //   // Puedes agregar más archivos de la misma manera
              //     // ]
              //     // attachments: [entradas].map(e => {

              //     //   return {
              //     //   filenamme: "ticket"+e+".pdf",
              //     //   content: fs.createReadStream('./entradas/'+e+'.pdf')
              //     //   }
                    
              //     //   })
              //   };

              //   try {
              //     // Envío del correo electrónico
              //     const info = await transporter.sendMail(mailOptions);
              //     console.log('Correo electrónico enviado:', info.response);
              //   } catch (error) {
              //     console.error('Error al enviar el correo electrónico:', error);
              //   }
              // }
              async function enviarCorreo(pago, linksHtml) {
                // Configuración del transporte del correo electrónico
                const transporter = nodemailer.createTransport({
                    host: 'smtp-relay.sendinblue.com',
                    port: 587,
                    auth: {
                        user: 'carlo.gammarota@gmail.com',
                        pass: 'wv5Xn140CbZDW9HR', // Considera usar variables de entorno para manejar las credenciales de forma segura
                    },
                });
            
                try {
                    // Leer el archivo HTML como una cadena de texto
                    let htmlContent = await readFile('./nuevo-mail.html', 'utf8');
                    // Reemplaza los marcadores de posición en el HTML con datos reales
                    let customizedHtml = htmlContent.replace(/{{linksHtml}}/g, pago.orderId);


                    // Construir la lista de adjuntos
                    const attachments = entradas.map(entrada => ({
                      // filename: `${id}.pdf`,
                      //poner nombre fullname del usuario
                      filename: `${entrada.nombre}.pdf`,
                      path: path.join('./entradas/', `${entrada._id}.pdf`)
                    }));

            
                    // Detalles del correo electrónico
                    const mailOptions = {
                        from: 'carlo.gammarota@gmail.com',
                        to: pago.email,
                        subject: 'Tickets Aura - ABRACADABRA - CLUB BALUMBA',
                        html: customizedHtml,
                        attachments: attachments
                        

                        // Aquí puedes agregar tus archivos adjuntos si los necesitas
                    };
            
                    // Envío del correo electrónico
                    const info = await transporter.sendMail(mailOptions);
                    console.log('Correo electrónico enviado:', info.response);
                } catch (error) {
                    console.error('Error al enviar el correo electrónico:', error);
                }
            }
            
            // Ejemplo de llamada a la función (asegúrate de definir 'pago' y 'linksHtml')
            // enviarCorreo(pago, "Link de Descarga");
            

              enviarCorreo(pago, linksHtml);



              //cierra el pago
              //editar el estado del pago a ticket generado true
              let ticketGenerado = await context.app.service('payments').patch(merchant_order.response.external_reference.replace(/"/g, '') ,{
                ticket_generado: true,
                // id_ticket: entrada._id,
              });

              // eslint-disable-next-line no-undef
              // console.log('entrada generada', entrada);
            }

            

        

            //hacer un if que pase una vez sola y no cada vez que se actualice el estado del pago solo si el estado es aprobado
            



            //si el estado es aprobado, se debe crear una entrada para el usuario y guardarla en la base de datos

            // let estadoPago = await context.app.service('payments').get(merchant_order.response.external_reference.replace(/"/g, ''));


            //crear servicio generar entrada y que devuelva el id de la entrada
            // let entrada = await context.app.service('entradas').create({
            //   dni: null,
            //   estado: 'no-ingreso',
            //   consumision: true
            // });

            // console.log('entrada', entrada);

            



            // let getPayment = await context.app.service('payments').get(merchant_order.response.external_reference.replace(/"/g, ''));
            // console.log('getPayment', getPayment.id_comprador);
            // //hacer un patch a la api que actualize la cuenta a premium
            // let premium = await context.app.service('users').patch( getPayment.id_comprador,{
            //   premium: true
            // });


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
