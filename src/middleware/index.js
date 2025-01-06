// eslint-disable-next-line no-unused-vars
const path = require('path');
const express = require('express');
const fs = require('fs');

// Ruta para la carpeta 'entradas'
const entradasPath = path.resolve(__dirname, '../../entradas'); // Ajusta esta ruta si es necesario

module.exports = function (app) {
  // Configuración de express para servir archivos estáticos
  if (fs.existsSync(entradasPath)) {
    console.log('La carpeta "entradas" se ha encontrado en:', entradasPath);

    // Usamos express.static para servir los archivos estáticos desde la carpeta "entradas"
    app.use('/entradas_generadas', express.static(entradasPath));

    // Ruta dinámica para servir un archivo específico con el ID
    app.get('/entradas_generadas/:idEntrada', (req, res) => {
      const { idEntrada } = req.params;  // Capturamos el ID de la entrada de la URL

      // Construimos la ruta del archivo usando el ID de la entrada
      const archivoPath = path.join(entradasPath, `${idEntrada}.pdf`);  // Cambia la extensión si es necesario

      // Verificamos si el archivo existe
      if (fs.existsSync(archivoPath)) {
        // Si el archivo existe, lo enviamos al cliente
        res.sendFile(archivoPath);
      } else {
        // Si no existe, respondemos con un error 404
        res.status(404).send('Entrada no encontrada');
      }
    });
  } else {
    console.error('No se ha encontrado la carpeta "entradas" en la ruta:', entradasPath);
  }
};
