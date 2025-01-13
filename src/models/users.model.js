// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
  
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    permissions: { type: Array },
    img: { type: String },
    nombre: { type: String },
    apellido: { type: String },
    finanzas: { type: Object },
    imagenFondo: { type: String },
    desarrollo: { type: Boolean },
    //  googleId: profile.id,
    //           displayName: profile.displayName,
    //           email: profile.email,
    //           imagen: profile.picture,
    //           requests: 200,
    //           credits: 40,
    //           name: profile.displayName,
    //           verified: true,
  
    googleId: { type: String },
    displayName: { type: String },
    imagen: { type: String },
    // requests: { type: Number },
    // credits: { type: Number },
    name: { type: String },
  
  
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
