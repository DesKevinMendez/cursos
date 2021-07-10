const axios = require('axios');

const getclima = async (lat, long) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4241124d479e084ab8aacc967ce7eef0&units=metric`)

    return response.data.main.temp;
};

module.exports = {
    getclima
}