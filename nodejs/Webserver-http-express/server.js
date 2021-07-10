const express = require('express')
const app = express()

const hbs = require('hbs');

const port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))

hbs.registerPartials(__dirname + '/views/parciales');
// Express HBS 
app.set('view engine', 'hbs');

// Helpers
require('./hbs/helpers/helpers')

app.get('/', function (req, res) {

    res.render('home', {
        nombre: "keVin meNdez"
    })

})



app.get('/about', function (req, res) {
    res.render('about');
})
app.listen(port, () => {
    console.log("Escuchando peticiones en el puerto " + port);
})