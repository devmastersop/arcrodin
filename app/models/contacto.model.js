const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var  ContactoSchema = new Schema({
    id_cliente: [{type: Schema.Types.ObjectId, ref: 'Clientes', required: true}],
    dni: String,
    nombres: String,
    apellidos: String,
    cargo: String,
    telefono: String,
    correo: String,
    sucursal: String
});

module.exports = mongoose.model('Contactos', ContactoSchema);
