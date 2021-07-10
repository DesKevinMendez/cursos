const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: "l",
            default: 10
        }
    }).command('crear', 'Imprime en un archivo txt la tabla desde base hasta limite', {
        base: {
            demand: true,
            alias: 'b'
        },
        limite: {
            alias: "l",
            default: 10
        }
    })
    .help()
    .argv;

// let base = "67";

const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar');

let comando = argv._[0];

switch (comando) {
    case 'listar':
        listarTabla(argv.base, argv.limite)
        break;
    case 'crear':

        crearArchivo(argv.base, argv.limite)
            .then(archivo => console.log(`El archivo ha sido creado: ${archivo}`))
            .catch(error => console.log(error));

        break;

    default:
        break;
}

// let argv2 = process.argv;
// console.log(argv2);
