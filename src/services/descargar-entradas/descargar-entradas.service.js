/* eslint-disable no-empty */
// Initializes the `descargar-entradas` service on path `/descargar-entradas`
const { DescargarEntradas } = require('./descargar-entradas.class');
const hooks = require('./descargar-entradas.hooks');

module.exports = function (app) {


  const options = {
    paginate: app.get('paginate')
  };

  app.use('/descargar-entradas', new DescargarEntradas(options, app), async function (req, res) {
    
    console.log('Data', res.hook.id);

    if (res.hook.method === 'get') {
      try {
        console.log('DescargarEntradas', 'DescargarEntradas');

        res.download('./entradas/'+ res.hook.id +'.pdf');
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
