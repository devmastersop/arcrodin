const Contacto = require('../models/contacto.model');
const Cliente = require('../models/cliente.model');
const mongoose = require('mongoose');
exports.getContacto = (req, res)=>{
    Contacto.find({}).populate('cliente', 'razonSocial').then(contactos => {
        res.status(200).send(contactos);
    });
}

exports.getContactos = (req, res) => {
    Contacto.find({})
    .select("cliente _id nombres apellidos correo telefono cargo sucursal")
    .populate('cliente', 'razonSocial')
    .exec()
    .then(contactos =>{
        res.status(200).json({
            count: contactos.length,
            contactos: contactos.map(contacto =>{
                return{
                    _id: contact._id,
                    cliente:contacto.client,
                    nombres: contacto.nombres,
                    apellidos: contacto.apellidos,
                    correo: contacto.correo,
                    telefono: contacto.telefono,
                    cargo: contacto.cargo,
                    sucursal: contacto.sucursal,
                    request:{
                        type: "GET",
                        url:"http://localhost:8000/api/contactos/list"+contacto._id
                    }
                }
            })
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
}


exports.postContactos = (req,res)=>{
    Cliente.findById(req.body.clienteId)
    .then(cliente =>{
        if(!cliente){
            return res.status(404).json({
                message: "Cliente not Found!"
            })
        }
        const contacto = new Contacto({
            codigoContacto: req.body.codigoContacto,
            cliente: req.body.clienteId,
            nombres: req.body.nombres,
            apellidos : req.body.apellidos,
            correo : req.body.correo,
            telefono: req.body.telefono,
            cargo: req.body.cargo,
            sucursal: req.body.sucursal
        });
        return contacto.save();
    })
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: "Contacto stored",
            createdContacto:{
                _id: result._id,
                cliente: result.cliente,
            }
        })
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({
            error: err
        })
    })
}
