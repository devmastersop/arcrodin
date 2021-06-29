const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: String,
    apellidos: String,
    telefono: Number,
    correo: String,
    cargo: String,
    user: String,
    pass: String
});

module.exports = mongoose.model('Usuarios', UsuarioSchema);
