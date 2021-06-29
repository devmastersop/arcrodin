const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var clientes = mongoose.model('Clientes');
var usuarios = mongoose.model('Usuarios');

var  ProformaSchema = new Schema({
    codProforma: String,
    cliente: [{ type: Schema.Types.ObjectId, ref: 'Clientes', required: true}],
    //usuario:[{ type: Schema.Types.ObjectId, ref: 'Usuario', required: true}],
    moneda: String,
    formaPago: String,
    tipo: String,
    fechaEmision: String,
    estado: String,
    observacion: String,
    obsInterna: String
})

module.exports = mongoose.model('Proformas', ProformaSchema)
