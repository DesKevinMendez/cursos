var socket = io();
socket.on('connect', function(){
    console.log("Conectado al servidor");
});

// on escucha eventos
socket.on('disconnect', function(){
    console.log("Se perdió la conexión");
});

// Emit envia informacion
socket.emit('enviarMensaje', {
    usuario: "Kevin Mendez",
    mensaje: "hola mundo",
}, function(res){
    console.log(res);
});

// Escuchar informacion
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});