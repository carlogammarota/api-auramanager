/* eslint-disable no-unused-vars */
exports.Totales = class Totales {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async get (id, params) {
    // Aggregation de ventas-all
    const ventasAll = await this.app.service('ventas-all').Model.aggregate(
      [
        {
          '$unwind': {
            'path': '$tragos'
          }
        }, {
          '$group': {
            '_id': null, 
            'totales': {
              '$sum': {
                '$toInt': '$tragos.valor'
              }
            }, 
            'cantidad': {
              '$sum': 1
            }
          }
        }
      ]);

    // Aggregation de ventas-all
    const resultado = await ventasAll.toArray();

    console.log('resultado', resultado);

    const total = resultado[0].totales;
    const cantidad = resultado[0].cantidad;

    return {
      _id : 'totales',
      cantidad,
      total,
    }

  }
};
