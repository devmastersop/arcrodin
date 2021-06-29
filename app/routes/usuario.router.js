module.exports = function(app){
    var usuarios = require('../controllers/usuario.controller');
    app.post('/api/usuario/add', usuarios.create);
    app.get('/api/usuario/list', usuarios.findall);
    app.get('/api/usuario/findone/:id', usuarios.findone);
    app.put('/api/usuario/updatebyid/:id', usuarios.update);
    app.delete('/api/usuario/deletebyid/:id', usuarios.delete);
    //app.get('/api/usuario/pagination', usuarios.pagination);
    //app.get('/api/usuario/pagefiltersort', usuarios.paginationfilterandsort);
}
