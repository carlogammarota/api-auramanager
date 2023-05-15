/* eslint-disable no-empty */
// Initializes the `descargar-entradas` service on path `/descargar-entradas`
const { DescargarEntradas } = require('./descargar-entradas.class');
const hooks = require('./descargar-entradas.hooks');

module.exports = function (app) {


  const options = {
    paginate: app.get('paginate')
  };

  app.use('/descargar-entradas', new DescargarEntradas(options, app), async function (req, res) {
    
   


   

   

    //de objeto id a string sacandole las comillas
    // idEntrada = JSON.stringify(idEntrada);
    // idEntrada = idEntrada.replace(/"/g, '');

    console.log('ID PAYMENT', res.hook.id);
    let idEntrada = await app.service('payments').get(res.hook.id);

    console.log('ID DEL TICKET SEGUN PAYMENT', idEntrada.id_ticket);

    console.log('ID DE LA LA ENTRADA', idEntrada);

    // console.log('ID DE LA LA ENTRADA', idEntrada);

    // idEntrada = idEntrada;
    // console.log('ACA VA', idEntrada.id_ticket);

    // idEntrada = 'idEntrada.id_ticket;'

    if (res.hook.method === 'get') {
      try {
        console.log('DescargarEntradas', 'DescargarEntradas');

        res.download('./entradas/'+ idEntrada.id_ticket +'.pdf');
        // res.download('./645d47d08688f7d0186cb609.pdf');

      } catch (e) {
      }

      // Return result
      return res;
    }


  });

  // Get our initialized service so that we can register hooks
  const service = app.service('descargar-entradas');

  service.hooks(hooks);
};
