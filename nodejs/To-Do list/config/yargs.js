const descripcion = {
    demand: true,
    alias: 'd'
}
const argv = require('yargs')
    .command('listar', 'Lista las tareas por hacer', {
    }).command('crear', 'Crea una nueva tarea por hacer', {
        descripcion,
    }).command('actualizar', 'Actualiza una tarea', {
        descripcion,
        completado: {
            default: true,
            alias: 'c',
            desc: "Marca una tarea como completada"
        }
    }).command('borrar', 'Elimina una tarea', {
        descripcion,
    })
    .help()
    .argv;

module.exports = {
    argv
}