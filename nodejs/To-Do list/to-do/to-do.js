const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile("db/data.json", data, (erro) => {
        if (erro) throw new Error("No se pudo grabar", erro)
    })
}

const cargarDB = () => {
    try {

        listadoPorHacer = require('./../db/data.json');

    } catch (error) {

        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    }

    listadoPorHacer.push(porHacer)

    guardarDB();

    return porHacer;
}

const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);

        guardarDB();

        return;
    } else {
        return false;
    }
}
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;

        guardarDB();

        return;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    borrar,
    getListado,
    actualizar
}