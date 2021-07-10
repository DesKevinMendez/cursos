const express = require('express');
// const fileUpload = require('express-fileupload');
const app = express();

// const Usuario = require('./../models/usuario');
// const Producto = require('./../models/producto');

const fs = require('fs');
const path = require('path');

const { verificaToken, verificaTokenURL } = require('./../middlewares/autenticacion');

app.get('/imagen/:tipo/:img', verificaTokenURL, (req, res)=> {
    let { tipo, img } = req.params;

    let notImage = path.resolve(__dirname, '../assets/not-found.jpeg');

    let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${ img }`);
    if (fs.existsSync(pathImage)) {

        res.sendFile(pathImage);
        
    } else {

        res.sendFile(notImage);
    }
})


module.exports = app;