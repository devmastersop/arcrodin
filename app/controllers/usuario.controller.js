const Usuario = require('../models/usuario.model.js');

// POST a Usuario
exports.create = (req, res) => {

    const usuario = new Usuario({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        telefono: req.body.telefono,
        correo: req.body.correo,
        cargo: req.body.cargo,
        user: req.body.user,
        pass: req.body.pass
    });

    usuario.save().then(data => {
        res.status(200).json({
            message: "Upload Successfully a Usuario to MongoDB with id = " + data.id,
            usuario: data,
        });
    }).catch(err => {
        res.status(500).json({
            message: "Fail!",
            error: err.message
        });
    });
};

// FETCH all Usuarios
exports.findall = (req, res) => {
    Usuario.find().select('-__v').then(usuarioInfos => {
        res.status(200).json({
            message: "Get all Usuarios' Infos Successfully!",
            numberOfUsuarios: usuarioInfos.length,
            usuarios: usuarioInfos
        });
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};

// find a Usuario by id
exports.findone = (req, res) => {
    Usuario.findById(req.params.id).select('-__v')
        .then(usuario => {
            res.status(200).json({
                message: " Successfully Get a Usuario from MongoDB with id = " + req.params.id,
                usuario: usuario
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Usuario not found with id " + req.params.id,
                    error: err
                });
            }
            return res.status(500).send({
                message: "Error retrieving Usuario with id " + req.params.id,
                error: err
            });
        });
};

// UPDATE a Usuario
exports.update = (req, res) => {

    Usuario.findByIdAndUpdate(
        req.params.id,
        {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            correo: req.body.correo,
            cargo: req.body.cargo,
            user: req.body.user,
            pass: req.body.pass
        },
        { new: true }
    ).select('-__v')
        .then(usuario => {
            if (!usuario) {
                return res.status(404).send({
                    message: "Error -> Can NOT update a Usuario with id = " + req.params.id,
                    error: "Not Found!"
                });
            }

            res.status(200).json({
                message: "Update successfully a Usuario with id = " + req.params.id,
                usuario: usuario,
            });
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can not update a Usuario with id = " + req.params.id,
                error: err.message
            });
        });
};

// DELETE a Usuario
exports.delete = (req, res) => {
    let usuarioId = req.params.id

    Usuario.findByIdAndRemove(usuarioId).select('-__v -_id')
        .then(usuario => {
            if (!usuario) {
                res.status(404).json({
                    message: "Does Not exist a Usuario with id = " + usuarioId,
                    error: "404",
                });
            }
            res.status(200).json({
                message: "Delete Successfully a Usuario with id = " + usuarioId,
                usuario: usuario,
            });
        }).catch(err => {
            return res.status(500).send({
                message: "Error -> Can NOT delete a usuario with id = " + usuarioId,
                error: err.message
            });
        });
};
/*
exports.filteringByAge = (req, res) => {
    const age = parseInt(req.query.age);

    Usuario.find({ age: age }).select("-__v")
        .then(results => {
            res.status(200).json({
                "message": "Get all Usuarios with age = " + age,
                "size": results.length,
                "usuarios": results
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



        let results = await Usuario.find({})
            .skip(offset)
            .limit(limit)
            .select("-__v");

        let numOfUsuario = await Usuario.countDocuments({});

        res.status(200).json({
            "message": "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
            "totalPages": Math.ceil(numOfUsuario / limit),
            "totalItems": numOfUsuario,
            "limit": limit,
            "currentPageSize": results.length,
            "usuarios": results
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

        let results = await Usuario.find({ age: age })
            .skip(offset)
            .limit(limit)
            .sort({ "firstname": 1, "lastname": -1 })
            .select("-__v");

        let numOfUsuario = await Usuario.countDocuments({ age: age });

        res.status(200).json({
            "message": "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
            "totalPages": Math.ceil(numOfUsuario / limit),
            "totalItems": numOfUsuario,
            "limit": limit,
            "age-filtering": age,
            "currentPageSize": results.length,
            "usuarios": results
        });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging + filtering + sorting request!",
            error: error.message,
        });
    }
};
*/
