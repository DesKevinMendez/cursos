const express = require('express')

const Usuario = require('./../models/usuario');

const _ = require('underscore');

const app = express()

const bcrypt = require('bcrypt');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

  app.get('/usuario', verificaToken ,function (req, res) {
    // usuarios limitados o paginados
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 5;


    Usuario.find({ estado: true }, 'nombre email role estado google img')
          .limit(Number(limite)) // limite de registros
          .skip(Number(desde)) // para paginacion
          .exec((erro, usuarios) => {
      if (erro) {
        return res.status(400).json({
            ok: false,
            err,
        });
      }

      Usuario.count({ estado: true }, (erro, conteo) => {
        
        res.json({
          ok: true,
          conteo,
          usuarios,
        });
      });
    })

  })
   
  app.post('/usuario', [verificaToken, verificaAdminRole], function (req, res) {
      let body = req.body;
  
      let { nombre, email, password, role } = body;
      let usuario = new Usuario({
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        role
      });

      usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        

        res.json({
            ok: true,
            usuario: usuarioDB
        });

      })
  })
   
  app.put('/usuario/:id', verificaToken, function (req, res) {
      let { id } = req.params;
      // let  body = req.body;

      // Evitar que algunos campos no sean actualizados (por ejemplo, password y autenticacion gooogle)

      let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
      
      Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err
          })
        }
        
        res.json({
            ok: true,
            usuarioDB
        })

      })
  })
   
  app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {

    let { id } = req.params;

    // Usuario.findByIdAndRemove(id, (error, usuarioEliminado) =>{
    Usuario.findByIdAndUpdate(id, { estado: false }, 
      { new: true }, (error, usuarioEliminado) =>{
      if (error) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      if (!usuarioEliminado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "usuario no encontrado",
          }
        })
      }

    res.json({
      ok: true,
      usuario: usuarioEliminado
    })
    
  });

  })

  module.exports = app;