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
    const fullname = context.result.fullname;
    console.log('Generar Entrada', id_entrada);

    // generar generarModelo1
    const generarModelo1 = async (id_entrada) => {

      // id_entrada  = 
      const entrada = {
        name: '+',
        lastName: '1 Consumición',
        address: '#Ticket Anticipada',
        addressNumber: 'Aura Productora',
        city: 'Valpisa Lab',
        zipCode: 'Capilla del Monte',
        phone: '5512345678'
      };

      const skus = 'Viernes 19 de Mayo 2023 00:00hs';
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

    //aura

    const generarModelo2 = async (id_entrada, fullname) => {
      try {
          // Crear un nuevo documento PDF
          const pdfDoc = await PDFDocument.create();
          const page = pdfDoc.addPage([1452, 1879]);
  
          // Agregar la imagen con dimensiones de 1900x1500
          const imageBytes = fs.readFileSync("./flayer_aura.png"); // Reemplaza con la ruta de tu imagen
          const imageSize = await pdfDoc.embedPng(imageBytes);
          page.drawImage(imageSize, {
              x: 0,
              y: 0,
              width: 1452,
              height: 1879,
          });
  
          // Agregar fullname
          const fontSize = 50;
          const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
          page.drawText(fullname, {
              x: 550, // Centrar horizontalmente si es necesario
              y: 180, // Ajustar verticalmente según sea necesario
              size: fontSize,
              font: font,
              color: rgb(1, 1, 1),
          });
  
          // Generar el código QR
          const qrDataUrl = await qr.toDataURL(id_entrada);
          const qrImageBytes = Buffer.from(qrDataUrl.split(",")[1], "base64");
          const qrImageSize = await pdfDoc.embedPng(qrImageBytes);
          page.drawImage(qrImageSize, {
              x: 350,
              y: 275,
              scale: 0.2, // Ajusta según sea necesario
              width: 800, // Ajusta según sea necesario
              height: 800, // Ajusta según sea necesario
          });
  
          // Guardar el PDF en bytes
          const pdfBytes = await pdfDoc.save();
          return pdfBytes;
      } catch (error) {
          console.error("Error generando el modelo:", error);
          throw error;
      }
  };

    // generarModelo2(id_entrada, fullname).then((data) => {
    //   fs.writeFileSync('./entradas/' + id_entrada + '.pdf', data);
    // }).catch((err) => {
    //   console.log(err);
    // }
    // );

    const aztec_1 = async (id_entrada) => {
      const entrada = {
          fullname: fullname,
          address: '#Ticket',
          addressNumber: 'Diag. Buenos Aires 102 - Capilla del Monte - Córdoba',
          city: 'Valpisa',
          // zipCode: '28001',
          // phone: '5512345678'
      };
  
      const skus = 'Viernes 15 de Enero 2025 1AM';
      let datos = id_entrada;
  
      // Genera el código QR con el id_entrada
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
  
      // Cargar logo de la imagen (se asume que 'logo.png' está presente en el mismo directorio)
      const imageBytesLogo = fs.readFileSync('./logoAztec.png');
  
      // Crea un nuevo documento PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([500, 200]);
  
      const imageSize = await pdfDoc.embedPng(imageBytes);
      const imageWidth = imageSize.width / 2;
      const imageHeight = imageSize.height / 2;
  
      const imageSizeLogo = await pdfDoc.embedPng(imageBytesLogo);
  
      // Agrega el texto del id de entrada
      page.drawText(id_entrada, {
          x: 210,
          y: 150,
          size: 15,
          maxWidth: 220,
          color: rgb(0, 0.1, 0.1),
      });
  
      // Agrega el nombre y apellido
      page.drawText(entrada.fullname, {
          x: 210,
          y: 60,
          size: 15,
          maxWidth: 220,
          color: rgb(0, 0.1, 0.1),
      });
  
      // Agrega la dirección
      page.drawText([entrada.address].join(', '), {
          x: 210,
          y: 170,
          size: 20,
          color: rgb(0, 0.1, 0.1),
      });
  
      // Agrega el número de la dirección
      page.drawText([entrada.addressNumber].join(', '), {
          x: 210,
          y: 135,
          size: 10,
          color: rgb(0, 0.1, 0.1),
      });
  
      // Agrega la ciudad
      page.drawText(entrada.city, {
          x: 210,
          y: 115,
          size: 20,
          color: rgb(0, 0.1, 0.1),
      });
  
      // Agrega el teléfono
      // page.drawText([entrada.phone].join(', '), {
      //     x: 210,
      //     y: 70,
      //     size: 20,
      //     color: rgb(0, 0.1, 0.1),
      // });
  
      // Dibuja un rectángulo
      page.drawRectangle({
          x: 5,
          y: 5,
          width: 490,
          height: 190,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
      });
  
      // Dibuja una línea
      page.drawLine({
          start: { x: 195, y: 50 },
          end: { x: 495, y: 50 },
          thickness: 0.5,
          color: rgb(0, 0, 0),
      });
  
      // Agrega los SKUs
      page.drawText(skus, {
          x: 210,
          y: 30,
          size: 13,
          color: rgb(0, 0.1, 0.1),
      });
  
      // Dibuja una línea vertical
      page.drawLine({
          start: { x: 195, y: 5 },
          end: { x: 195, y: 195 },
          thickness: 1,
          color: rgb(0, 0, 0),
      });
  
      // Dibuja el código QR
      page.drawImage(imageSize, {
          x: 10,
          y: 10,
          width: 180,
          height: 180,
      });
  
      // Dibuja el logo en la esquina superior derecha
      page.drawImage(imageSizeLogo, {
          x: 320,
          y: -10,
          width: 180,
          height: 180,
      });
  
      const pdfBytes = await pdfDoc.save();
      return pdfBytes;
  };

    aztec_1(id_entrada, fullname).then((data) => {
      fs.writeFileSync('./entradas/' + id_entrada + '.pdf', data);
    }).catch((err) => {
      console.log(err);
    }
    );
    

  // const id_entrada = "6582738aa0fddca19d12af8b"; // Reemplaza con tu ID de entrada
  
  
    

  // generarModelo1(id_entrada, fullname).then((data) => {
  //     fs.writeFileSync('./entradas/' + id_entrada + '.pdf', data);
  //   }).catch((err) => {
  //     console.log(err);
  //   }
  //   );



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
