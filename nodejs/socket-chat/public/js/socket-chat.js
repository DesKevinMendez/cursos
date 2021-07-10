var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error("El nombre y sala es necesario");
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {

    socket.emit('entrarChat', usuario, function(res) {
        renderizarUsuarios(res);
        // console.log("Usuarios conectados ", res);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    renderizarMensajes(mensaje, false);
    scrollBottom();

});

// Escuchar cambios de usuario (cuando un usuario entra o sale del chat)
socket.on('listaPersonas', function(personas) {
    renderizarUsuarios(personas);
    

});

// mensajes privados

socket.on('mensajePrivado', function(mensaje){
    console.log("Mensaje privado ", mensaje);
})


