module.exports = function(app){
    var clientes = require('../controllers/cliente.controller');
    app.post('/api/cliente/add', clientes.create);
    app.get('/api/cliente/list', clientes.findall);
    app.get('/api/cliente/findone/:id', clientes.findone);
    app.put('/api/cliente/updatebyid/:id', clientes.update);
    app.delete('/api/cliente/deletebyid/:id', clientes.delete);
    //app.get('/api/cliente/pagination', clientes.pagination);
    //app.get('/api/cliente/pagefiltersort', clientes.paginationfilterandsort);
}
