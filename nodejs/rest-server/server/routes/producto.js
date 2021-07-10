const express = require('express');

let { verificaToken } = require('./../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');

// Obtener todos los productos

app.get('/productos', verificaToken, (req, res)=>{
    // trae todos los productos
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;

    Producto.find({ disponible: true})
        .sort('nombre')
        .populate("usuario", 'nombre email')
        .populate("categoria", 'descripcion nombre')
        .limit(Number(limite)) // limite de registros
        .skip(Number(desde)) // para paginacion
        .exec((erro, productos) => {
            if (erro) {
                return res.status(500).json({
                    ok: false,
                    erro,
                });
            }

            Producto.count({ disponible: true }, (erro, conteo) => {
                if (erro) {
                    return res.status(500).json({
                        ok: false,
                        erro,
                    });
                }

                res.json({
                    ok: true,
                    conteo,
                    productos,
                    total: productos.length
                });
            });
    })
})

// Obtiene un proyecto por id

app.get('/productos/:id', verificaToken, (req, res)=>{
    // populate usario, categoria
    let { id } = req.params;

    Producto.findById(id)
        .populate("usuario", 'nombre email')
        .populate("categoria", 'descripcion nombre')
        .exec((erro, producto)=> {
            if (erro) {
                return res.status(500).json({
                    ok: false,
                    erro
                })
            }
    
            if (!producto) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Producto no encontrada"
                    }
                })
            }
    
            res.json({
                ok: true,
                producto,
            })
        })
})

// Post para crear un nuevo producto

app.post('/productos', verificaToken, (req, res)=>{
    // grabar el usuario
    let body = req.body;
  
    let { nombre, precioUni, descripcion, disponible, categoria } = body;

    let producto = new Producto({
        nombre,
        precioUni,
        descripcion,
        disponible,
        categoria,
        nombre,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    })

})



// PUT para actualizar un producto

app.put('/productos/:id', verificaToken, (req, res)=>{
    // grabar el usuario
    let { id } = req.params;

    let body = req.body; 

    let descProdcuto = {
        descripcion: body.descripcion,
        precioUni: body.precioUni,
    }
    
    Producto.findByIdAndUpdate(id, descProdcuto, { new: true, runValidators: true }, 
        (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            
            res.json({
                ok: true,
                producto: productoDB
            })

    })
    // grabar una categoria del listado
})

// Busca productos

app.get('/productos/buscar/:termino', verificaToken, (req, res)=>{
    let { termino } = req.params;

    let regex = new RegExp(termino, 'i');


    Producto.find({ nombre: regex })
        .populate("usuario", 'nombre email')
        .populate("categoria", 'descripcion nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            })
        })
})


// Delete para un producto

app.delete('/productos/:id', verificaToken, (req, res)=>{
    // disponible pase a false
    let { id } = req.params;
    let body = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, body, 
       (err, productoEliminado) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoEliminado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Producto no encontrado",
                }
            })
        }

        res.json({
            ok: true,
            message: "Producto eliminada con éxito",
            producto: productoEliminado,
        })
        
    });
})

module.exports = app;