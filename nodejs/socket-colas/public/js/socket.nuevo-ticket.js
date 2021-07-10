// comando para establecer la conexión

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log("Conectado al servidor");
    
})
socket.on('disconnect', function(){
    console.log("Desconectado del servidor");      
})

socket.emit('estadoActual', null, function(estado){
    console.log(estado);
    label.text(estado.actual)
})

$('button').on('click', function(){

    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });

})