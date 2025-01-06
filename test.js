const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');
const qr = require('qrcode');

const aztec_1 = async (id_entrada) => {
    const entrada = {
        fullname: 'Charly G',
        address: '#Ticket',
        addressNumber: 'Diag. Buenos Aires 102 - Capilla del Monte - Córdoba',
        city: 'Valpisa',
        // zipCode: '28001',
        // phone: '5512345678'
    };

    const skus = 'Viernes 15 de Enero 2025 00:00hs';
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

// Datos de entrada ficticios
const id_entrada = '677afc0fb41b681764211cb3';

aztec_1(id_entrada).then((data) => {
    fs.writeFileSync('./entradas/' + id_entrada + '.pdf', data);
}).catch((err) => {
    console.log(err);
});
