var socket = io();

socket.on('connect', function(){
    console.log("Conectado al servidor");
    
})
socket.on('disconnect', function(){
    console.log("Desconectado del servidor");      
})

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';

    throw new Error("El escritorio es necesario"); // evita que se siga ejecutando el codigo js
    // se  usa throw porque no tenemos acceso al return ya que no estamos en una funcion

};

var escritorio = searchParams.get('escritorio');
let label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function(){
    
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res){
        if (res === "Ya no hay tickets") {
            label.text(res);
            alert(res)
            return;
        }
        label.text('Ticket '+res.numero);
    })

})
