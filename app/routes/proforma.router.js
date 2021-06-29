module.exports = function (app) {
    var proforma = require('../controllers/proforma.controller');
    app.get('/api/proforma/list', proforma.getProformas);
    app.post('/api/proforma/add', proforma.postProformas);
}
