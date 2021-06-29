const Proforma = require('../models/proforma.model');
const Cliente = require('../models/cliente.model');
const Usuario = require('../models/usuario.model');
const mongoose = require('mongoose');
/*
exports.getProforma = (req, res)=>{
    Proforma.find().populate({ patch: 'usuarios' }).exec((err, proforma) => {
        if (err) {
            res.status(500).send({ message: 'Error de conexión a la BD' });
        } else {
            if (!proforma) {
                res.status(404).send({ message: 'No existe la DB' });
            } else {
                Cliente.populate(proforma, { patch: 'clientes' }, (err, client)=>{
                    if (err) {
                        res.status(500).send({ message: 'Error de conexión' })
                    } else {
                        res.status(200).send(proforma)
                    }
                });
            }
        }
    });
}

exports.getProforma = (req, res) => {
    Proforma.find().select('-__v').then(proformaInfos => {
        res.status(200).json({
            message: "Get all proforma' Infos Successfully!",
            numberOfProformas: proformaInfos.length,
            proforma: proformaInfos
        });
    }).catch(error => {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    });
};
*/

exports.getProforma = (req, res)=>{
    Proforma.find({}).populate('cliente', 'razonSocial').then(proformas => {
        res.status(200).send(proformas);
    });
}

exports.getProformas = (req, res) => {
    Proforma.find({})
    .select("cliente moneda formaPago  _id")
    .populate('cliente', 'razonSocial')
    .exec()
    .then(proformas => {
        res.status(200).json({
            count: proformas.length,
            proformas: proformas.map(proforma => {
                return {
                    _id: proforma._id,
                    cliente: proforma.cliente,
                    moneda: proforma.moneda,
                    formaPago: proforma.formaPago,
                    request:{
                        type: "GET",
                        url:"http://localhost:8000/api/proformas/list"+proforma._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}


exports.postProformas = ( req, res) => {
    Cliente.findById(req.body.clienteId)
    .then(cliente => {
        if(!cliente){
            return res.status(404).json({
                message: "Cliente not found!"
            })
        }
        const proforma = new Proforma({
            //_id: mongoose.Types.ObjectId(),
            codigoProforma: req.body.codigoProforma,
            cliente:req.body.clienteId,
            moneda: req.body.moneda,
            formaPago: req.body.formaPago,
            tipo: req.body.tipo,
            fechaEmision: req.body.fechaEmision,
            estado: req.body.estado,
            observacion: req.body.observacion,
            obsInterna: req.body.obsInterna
        });
        return proforma.save();
    })
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Proform stored",
            createdProforma:{
                _id: result._id,
                cliente:result.cliente,
            }
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: err
        })
    })
}

