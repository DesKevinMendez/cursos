const { argv } = require('./config/yargs')
const { getLugarLatLng } = require('./lugar/lugar');
const { getclima } = require('./clima/clima');

const getInfo = async () => {
    const coordenadas = await getLugarLatLng(argv.direccion)

    let mensaje = ""

    await getclima(coordenadas.lat, coordenadas.lng).then(res => {

        mensaje = `El clima para ${argv.direccion} es: ${res} °C`
    }).catch(error => {
        mensaje = `No se pudo determinar el clima para: ${argv.direccion}`
    })

    return mensaje
}

getInfo().then(console.log);
