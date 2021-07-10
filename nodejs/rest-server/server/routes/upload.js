const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('./../models/usuario');
const Producto = require('./../models/producto');

const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {

    let { tipo, id } = req.params;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded.',
            }
        });
    }

    // Validar tipo

    let tiposValidos = ["productos", "usuarios"];

    if (tiposValidos.indexOf(tipo) < 0 ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Tipos soportados: " + tiposValidos.join(','),
                recibido: tipo,
            },
        });
    }


    // Validar extension de archivo

    let archivo = req.files.archivo;
    
    let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

    let extensionArchivo = archivo.name.split('.');

    let extension = extensionArchivo[extensionArchivo.length -1];

    if (extensionesValidas.indexOf(extension) < 0 ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Archivo no soportado, favor enviar " + extensionesValidas.join(','),
                extension,
            },
        });
    }

    // cambiar nombre al archivo [que sea unico]

    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`

    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err)
          return res.status(500).json({
              ok: false,
              err,
          });

        // Aquí la imagen ya se cargo
        if (tipo === "usuarios") {
            
            imagenUsuario(id, res, nombreArchivo);

        } else {

            imagenProducto(id, res, nombreArchivo)
        }

      });
});

function imagenUsuario(id, res, nombreArchivo) {
    
    Usuario.findById(id, (err, usuarioDB) => {
        
        if (err) {

            // Verificamos que no se duplique y si existe, eliminamos.
            borraArchivo(nombreArchivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {

            // Verificamos que no se duplique y si existe, eliminamos.
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El usuario no existe",
                }
            })
        }


        //Verificamos que no se duplique y si existe, eliminamos.
        borraArchivo(usuarioDB.img, 'usuarios');


        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado)=> {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                message: 'Usuario guardado',
                usuario: usuarioGuardado
            });

        });


        
    })
}

function imagenProducto(id, res, nombreArchivo) {
     Producto.findById(id, (err, productoDB) => {
        
        if (err) {
            // Verificamos que no se duplique y si existe, eliminamos.
            borraArchivo(nombreArchivo, 'productos');

            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            // Verificamos que no se duplique y si existe, eliminamos.
            borraArchivo(nombreArchivo, 'productos');

            return res.status(400).json({
                ok: false,
                err: {
                    message: "El producto no existe",
                }
            })
        }


        //Verificamos que no se duplique y si existe, eliminamos.
        borraArchivo(productoDB.img, 'productos');


        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado)=> {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                message: 'Producto actualizado',
                producto: productoGuardado
            });

        });


        
    })
}


function borraArchivo(nombArchivo, tipo) {
    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${ nombArchivo }`);
    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = app;