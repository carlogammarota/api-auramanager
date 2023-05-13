const { Service } = require('feathers-memory');

exports.DescargarEntradas = class DescargarEntradas extends Service {
  constructor(options) {
    super(options);
  }

  async get(id, params) {
    console.log('Todo bien', 'get', id, params);
    // Obtener el servicio de blobs
    const blobService = this.app.service('blobs');

    // Obtener el blob del servicio de blobs
    const blob = await blobService.get(id);

    // Crear una nueva promesa para escribir el blob en el sistema de archivos
    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, 'descargar-entradas', `${id}.pdf`); // ruta donde se guardará el archivo
      const stream = fs.createWriteStream(filePath);

      blob.on('end', () => {
        resolve({ message: `Archivo descargado a ${filePath}` });
      });

      blob.on('error', (err) => {
        reject(err);
      });

      blob.pipe(stream);
    });
  }
};
