const express = require('express');
const { verificaADmin_Role } = require('../middlewares/autenticacion');

let { verificaToken } = require('../middlewares/autentificacion');
const app = require('./usuario');

/*

//====================
// Mostrar una categoria 
//====================
app.get('/categoria', verificaToken, (req, res) => {


    Categoria.find({})
     .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exect((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                categorias
            })

        })
})

//====================
// Mostrar una categoria por ID
//====================
app.get('/categoria/:id', verificaToken, (req, res) => {


    Categoria.findBiId(id, (err, categoriaDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no es correcto'
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })


})


//====================
// Crear nueva categoria
//====================
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({

        descricpion: body.descricpion,
        usuario: req.usuario._id

    });

    categoria.save((err, categoriaDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            categoria: categoriaDB
        });

    })

});

//====================
// Actualizar nueva categoria
//====================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descricpcion: body.descricpion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    })

})

//====================
// Eliminar nueva categoria
//====================
app.delete('/categoria/:id', [verificaToken, verificaADmin_Role], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        });

    })

})




module.exports = app;

*/