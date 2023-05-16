// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const qr = require('qrcode');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    // id = context.data;


    // console.log('Generar Entrada', context.result._id);
    //convertir el id de objeto_id a string

    const id_entrada = JSON.stringify(context.result._id).replace(/"/g, '');
    console.log('Generar Entrada', id_entrada);

    
    const generar = async (id_entrada) => {

      // id_entrada  = 
      const entrada = {
        name: '+',
        lastName: '1 Consumición',
        address: '#Ticket',
        addressNumber: 'Aura Productora',
        city: 'Valpisa Lab',
        zipCode: 'Capilla del Monte',
        phone: '5512345678'
      };

      const skus = 'Viernes 19 de Mayo 2023';
      //datos de la imagen del qr
      let datos = id_entrada;
    


      const imageBytes = await qr.toBuffer(datos, {
        type: 'png',
        errorCorrectionLevel: 'H',
        margin: 1,
        quality: 1,
        width: 1000,
        color: {
          dark: '#000',
          light: '#FFF'
        }
      });
      const imageBytesLogo = fs.readFileSync('./logo.png');

      // Crea un nuevo documento PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([500, 200]);


      // Define la posición y el tamaño de la imagen
      const imageSize = await pdfDoc.embedPng(imageBytes);
      const imageWidth = imageSize.width / 2;
      const imageHeight = imageSize.height / 2;

      const imageSizeLogo = await pdfDoc.embedPng(imageBytesLogo);

      // embed a Google font and set the font size
      // const fontBytes = await fetch('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')
      //     .then(res => res.text())
      //     .then(data => {
      //         const match = data.match(/url\((.*?)\)/)[1];
      //         return fetch(match).then(res => res.arrayBuffer());
      //     });

      // pdfDoc.registerFontkit(fontkit)

      // const font = await pdfDoc.embedFont(fontBytes);






      page.drawText(id_entrada, {
        x: 210,
        y: 150,
        size: 15,
        // font,
        maxWidth: 220,
        color: rgb(0, 0.1, 0.1),
      });
      page.drawText([entrada.name, entrada.lastName].join(' '), {
        x: 210,
        y: 60,
        size: 15,
        // font,
        maxWidth: 220,
        color: rgb(0, 0.1, 0.1),
      });

      page.drawText([entrada.address].join(', '), {
        x: 210,
        y: 170,
        size: 20,
        color: rgb(0, 0.1, 0.1),
        // rotate: degrees(-45),
      });
      page.drawText([entrada.addressNumber].join(', '), {
        x: 210,
        y: 100,
        size: 10,
        color: rgb(0, 0.1, 0.1),
        // rotate: degrees(-45),
      });
      page.drawText(entrada.city, {
        x: 210,
        y: 80,
        size: 20,
        color: rgb(0, 0.1, 0.1),
        // rotate: degrees(-45),
      });
      page.drawText([entrada.phone.formatInternational].join(', '), {
        x: 210,
        y: 70,
        size: 20,
        color: rgb(0, 0.1, 0.1),
        // rotate: degrees(-45),
      });


      page.drawRectangle({
        x: 5,
        y: 5,
        width: 490,
        height: 190,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      page.drawLine({
        start: { x: 195, y: 50 },
        end: { x: 495, y: 50 },
        thickness: 0.5,
        color: rgb(0, 0, 0),
        opacity: 1,
      });



      // Write SKUs
    
      page.drawText(skus, {
        x: 210,
        y: 30,
        size: 13,
        color: rgb(0, 0.1, 0.1),
        // rotate: degrees(-45),
      });


      page.drawLine({
        start: { x: 195, y: 5 },
        end: { x: 195, y: 195 },
        thickness: 1,
        color: rgb(0, 0, 0),
        opacity: 1,
      });

      page.drawImage(imageSize, {
        x: 10,
        y: 10,
        width: 180,
        height: 180,
      });

      // Add logo top right corner
      page.drawImage(imageSizeLogo, {
        x: 330,
        y: -10,
        width: 180,
        height: 180,
      });

      const pdfBytes = await pdfDoc.save();
      return pdfBytes;


    };


    

    // let id_entrada = id_entrada;

    generar(id_entrada).then((data) => {
      fs.writeFileSync('./entradas/' + id_entrada + '.pdf', data);
    }).catch((err) => {
      console.log(err);
    }
    );

    // let entradas = ['645d47798688f7d0186cb5fa', '645d47d08688f7d0186cb609', '645d74db744bdfa7332e7f93', '645d74dc744bdfa7332e7f95', '645d74dd744bdfa7332e7f97'];

    // for (let index = 0; index < entradas.length; index++) {
    //   const entrada = entradas[index];

    //   generar(entrada).then((data) => {
    //     fs.writeFileSync('./entradas/' + entrada + '.pdf', data);
    //   }).catch((err) => {
    //     console.log(err);
    //   }
    //   );
    
    // }


    return context;
  };
};
