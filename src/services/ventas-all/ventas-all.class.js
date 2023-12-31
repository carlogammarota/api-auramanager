const { Service } = require('feathers-mongodb');

exports.VentasAll = class VentasAll extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('ventas-all');
    });
  }
};
