module.exports = function (app) {
    var contacto = require('../controllers/contacto.controller');
    app.get('/api/contacto/list', contacto.getContacto);
    app.post('/api/contacto/add', contacto.postContactos);
}
