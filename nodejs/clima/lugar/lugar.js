const axios = require('axios');

const getLugarLatLng = async (direccion) => {
    const encoderURL = encodeURI(direccion)

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encoderURL}`,
        timeout: 10000,
        headers: { 'X-RapidAPI-Key': '39219e984bmsha003bacb3345512p1244dajsnc040836f0cf7' }
    });

    const respuesta = await instance.get()

    const data = respuesta.data.Results[0];
    if (respuesta.data.Results.length === 0) {
        throw new Error("No hay direccion para " + direccion);
    }

    const direccions = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        direccion: direccions,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}