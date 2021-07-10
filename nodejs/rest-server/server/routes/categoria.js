const express = require('express');

let { verificaToken, verificaAdminRole } = require('./../middlewares/autenticacion');

let app = express();

const _ = require('underscore');

let Categoria = require('../models/categoria');

// Todas las categorias

app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate("usuario", 'nombre email')
        .exec((erro, categorias) => {
            if (erro) {
                return res.status(500).json({
                    ok: false,
                    erro,
                });
            }

            Categoria.count((erro, conteo) => {
        
                res.json({
                    ok: true,
                    conteo,
                    categorias,
                });
            });
    })
});

// Mostrar una categoria por id
app.get('/categoria/:id', (req, res)=> {
    let { id } = req.params;

    Categoria.findById(id, (erro, cate)=> {
        if (erro) {
            return res.status(500).json({
                ok: false,
                erro
            })
        }

        if (!cate) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria no encontrada"
                }
            })
        }

        res.json({
            ok: true,
            categoria: cate,
        })
    })
})

// Crear una nueva categoria
app.post('/categoria', verificaToken, (req, res) =>{
    // req.usuario._id
    let body = req.body;
  
      let { nombre, descripcion } = body;
      let categorias = new Categoria({
        nombre,
        descripcion,
        usuario: req.usuario._id
      });

      categorias.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

      })

})

// Actualiza una categoria

app.put('/categoria/:id', verificaToken, (req, res)=>{
    let { id } = req.params;

    let body = _.pick(req.body, ['descripcion']);

    let descCategoria = {
        descripcion: body.descripcion,
    }
    
    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        
        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })

})

// Elimina una categoria
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    // Solo admin debe de eliminar una categoria.
    let { id } = req.params;
    
    Categoria.findByIdAndRemove(id, 
       (err, CategoriaEliminado) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!CategoriaEliminado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "categoria no encontrada",
                }
            })
        }

        res.json({
            ok: true,
            categoria: "Categoria eliminada con exito"
        })
        
    });
});

module.exports = app;
