const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var  ClienteSchema = new Schema({
    codigoCliente: Number,
    razonSocial: String,
    ruc: String,
    direccion: String,
    obsCliente: String
});

module.exports = mongoose.model('Clientes', ClienteSchema);
