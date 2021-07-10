const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        required: true,
        type: String
    },
    descripcion: {
        required: [true, "La descripcion es requerida"],
        type: String,
        default: "Cualquier cosa"
    },
    usuario: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});


module.exports = mongoose.model('Categoria', categoriaSchema);