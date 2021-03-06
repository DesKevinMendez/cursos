const { argv } = require('./config/yargs');
const { crear, getListado, actualizar, borrar } = require('./to-do/to-do');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = getListado();

        for (let tarea of listado) {
            console.log("===========================");
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log("===========================");
        }
        break;
    case 'actualizar':
        let actualizado = actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        break;
}