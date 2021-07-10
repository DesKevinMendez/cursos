const http = require('http');


http.createServer((req, res) => {

    res.writeHead(200, { 'Content-type': 'application/json' });

    let salida = {
        nombre: 'Kevin',
        edad: 32,
        url: req.url
    }

    res.write(JSON.stringify(salida))

    res.end();
}).listen(8082);


