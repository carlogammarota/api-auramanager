// eventos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'eventos';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    // text: { type: String, required: true }
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    // fechaHora: { type: Date, required: true },
    fechaHora: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    imagenes: { type: Array, required: false },
    ubicacion: { type: String, required: false },
    categoria: { type: String, required: false },
    estado: { type: String, required: false },
    tipo: { type: String, required: false },
    precio: { type: Number, required: false },
    capacidad: { type: Number, required: false },
    asistentes: { type: Array, required: false },
    comentarios: { type: Array, required: false },
    valoracion: { type: Number, required: false },
    tags: { type: Array, required: false },
    destacado: { type: Boolean, required: false },


  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
