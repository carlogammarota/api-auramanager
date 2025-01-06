// payments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'payments';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    text: { type: String, required: false },
    id_comprador: { type: String, required: false },
    id_vendedor: { type: String, required: false },
    productos: { type: Array, required: false },
    linkDePago: { type: String, required: false },
    estado: { type: String, required: false },
    external_reference: { type: String, required: false },
    ticket_generado: { type: Boolean, required: false },
    id_ticket: { type: String, required: false },
    cantidadTickets: { type: Number, required: false },
    email: { type: String, required: false },
    participantes: { type: Array, required: false },
    orderId: { type: String, required: false },
    publica: { type: String, required: false },
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
