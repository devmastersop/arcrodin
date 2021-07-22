const express = require ('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const dbConfig = require('./app/config/mongodb.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Successfully connected to MongoDB');
    }).catch((err) => {
        console.log('Failed to connect to MongoDB');
        process.exit();
    })

require('./app/routes/usuario.router')(app);
require('./app/routes/cliente.router')(app);
require('./app/routes/proforma.router')(app);
require('./app/routes/contacto.router')(app);

const server = app.listen(8000, function () {
    let host = server.address().address
    let port = server.address().port

    console.log('Server listening on ', host, port);
})
