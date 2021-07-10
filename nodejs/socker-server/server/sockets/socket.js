const { io } = require('./../server')
// saber cuando alguien se conecta al server

io.on('connection', (client)=>{
    console.log("Usuario conectado");

    // cuando se pierde la conexion con un usuario
    client.on('disconnect', ()=>{
        console.log("Usuario desconectado");
    });

    // escucha al cliente
    client.on('enviarMensaje', (data, callback)=>{
        console.log(data);

        client.broadcast.emit('enviarMensaje', data)
        // if (data.usuario){
        //     callback({
        //         resp: "todo salio bien "
        //     })
        // } else {

        //     callback({
        //         resp: "Todo salio mal"
        //     });
        // }

    });
})
