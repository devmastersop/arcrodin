const Cliente = require('../models/cliente.model');

// POST a Cliente
exports.create = (req, res) => {

    const cliente = new Cliente({
        codigoCliente: req.body.codigoCliente,
        razonSocial: req.body.razonSocial,
        ruc: req.body.ruc,
        direccion: req.body.direccion,
        obsCliente: req.body.obsCliente
    });

    cliente.save().then(data => {
        res.status(200).json({
            message: "Upload Successfully a Cliente to MongoDB with id = " + data.id,
            cliente: data,
        });
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};

// FETCH all Clientes
exports.findall = (req, res) => {
    Cliente.find().select('-__v').populate('proformas').then(clienteInfos => {
        res.status(200).json({
            message: "Get all Cliente' Infos Successfully!",
            numberOfClientes: clienteInfos.length,
            cliente: clienteInfos
        });
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

// find a Cliente by id
exports.findone = (req, res) => {
    Cliente.findById(req.params.id).select('-__v')
        .then(cliente => {
            res.status(200).json({
                message: " Successfully Get a Cliente from MongoDB with id = " + req.params.id,
                cliente: cliente
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Cliente not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving Cliente with id " + req.params.id,
                error: err
            });
        });
};

// UPDATE a Cliente
exports.update = (req, res) => {

    Cliente.findByIdAndUpdate(
        req.params.id,
        {
            codigoCliente: req.body.codigoCliente,
            razonSocial: req.body.razonSocial,
            ruc: req.body.ruc,
            direccion: req.body.direccion,
            obsCliente: req.body.obsCliente
        },
        { new: true }
    ).select('-__v')
        .then(cliente => {
            if (!cliente) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a Cliente with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json({
                message: "Update successfully a Cliente with id = " + req.params.id,
                cliente: cliente,
            });
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can not update a Cliente with id = " + req.params.id,
                error: err.message
            });
        });
};

// DELETE a Cliente
exports.delete = (req, res) => {
    let clienteId = req.params.id;

    Cliente.findByIdAndRemove(clienteId).select('-__v -_id')
        .then(cliente => {
            if (!cliente) {
                res.status(404).json({
                    message: "Does Not exist a Cliente with id = " + clienteId,
                    error: "404",
                });
            }
            res.status(200).json({
                message: "Delete Successfully a Cliente with id = " + clienteId,
                cliente: cliente,
            });
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can NOT delete a customer with id = " + clienteId,
                error: err.message
            });
        });
};
/*
exports.filteringByAge = (req, res) => {
    const age = parseInt(req.query.age);

    Cliente.find({ age: age }).select("-__v")
        .then(results => {
            res.status(200).json({
                "message": "Get all Clientes with age = " + age,
                "size": results.length,
                "clientes": results
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error!",
                error: err
            });
        });
}

exports.pagination = async (req, res) => {

    try {

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const offset = page ? page * limit : 0;



        let results = await Cliente.find({})
            .skip(offset)
            .limit(limit)
            .select("-__v");

        let numOfCliente = await Cliente.countDocuments({});

        res.status(200).json({
            "message": "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
            "totalPages": Math.ceil(numOfCliente / limit),
            "totalItems": numOfCliente,
            "limit": limit,
            "currentPageSize": results.length,
            "customers": results
        });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }

}

exports.paginationfilterandsort = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const age = parseInt(req.query.age);

        const offset = page ? page * limit : 0;

        let results = await Cliente.find({ age: age })
            .skip(offset)
            .limit(limit)
            .sort({ "firstname": 1, "lastname": -1 })
            .select("-__v");

        let numOfCliente = await Cliente.countDocuments({ age: age });

        res.status(200).json({
            "message": "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
            "totalPages": Math.ceil(numOfCliente / limit),
            "totalItems": numOfCliente,
            "limit": limit,
            "age-filtering": age,
            "currentPageSize": results.length,
            "customers": results
        });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging + filtering + sorting request!",
            error: error.message,
        });
    }
};*/
