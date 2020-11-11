const express = require('express')

const { verificaToken } = require('../middlewares/autenticacion')

let app = express();
let Producto = require('../config/models/producto')

//================
//Buscar productos
//=================
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {


    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                productos
            })

        })
})

//================
//Obtener todos los productos
//=================

app.get('/productos', verificaToken, (req, res) => {

    //trae todos los productos
    //populate: usuario
    //paginado

    let desde = req.query.desde || 0;

    desde = Number(desde);


    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                productos
            })

        })

})

//================
//Obtener un productpo por ID
//=================

app.get('/productos/:id', (req, res) => {

    //populate: usuario
    //paginado

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {

                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El producto no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })


        })

})

//================
//Crear un nuevo producto
//=================
app.post('/productos', verificaToken, (req, res) => {

    //grabar el usuario
    //grabar una categoria del listado

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    })

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            producto: productoDB
        })

    })

})


//================
//Actualizar un producto
//=================
app.put('/productos/:id', verificaToken, (req, res) => {

    //grabar el usuario
    //grabar una categoria del listado

    let id = req.params.id;
    let body = req.body;


    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }


        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                producto: productoGuardado
            })

        })

    })



})

//================
//Borrar un producto
//=================
app.delete('/productos/:id', verificaToken, (req, res) => {

    //grabar el usuario
    //grabar una categoria del listado

    let id = req.params.id;


    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            });
        }

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto borrado'
            });


        })


    })

})



module.exports = app;