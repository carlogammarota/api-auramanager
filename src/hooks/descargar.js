// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
//import fs
const fs = require('fs');
const path = require('path');
//import
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // return context;
    
    
    //TRAER ID DE LA ENTRADA
    let idEntrada = await context.app.service('payments').get(context.id);

    // idEntrada = idEntrada;
    console.log('ID DEL TICKET SEGUN PAYMENT', idEntrada.id_ticket);

    idEntrada = idEntrada.id_ticket;

    if (!idEntrada) {
      throw new Error('Id is required to download file');
    }


    // const filePath = `./${idEntrada}`;
    //agregarle la raiz
    const filePath = path.join('./entradas/'+ idEntrada + '.pdf');
    // const filePath = path.join(__dirname, `/entradas/${idEntrada}`);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }


      
    // Establecer las cabeceras de respuesta
    context.type = 'application/pdf';
    // context.res.attachment('./645d47d08688f7d0186cb609.pdf');

    // context.resport.body = filePath;

    // // Leer el archivo y enviarlo como respuesta
    // context.response.body = fs.createReadStream(filePath);

    context.result =  fs.createReadStream(filePath);

    // console.log(context.headers);
       
    // console.log('context', context);
    
    return context;
  };
};
