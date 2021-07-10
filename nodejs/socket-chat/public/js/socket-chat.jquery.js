// funciones para renderizar usuarios
var params = new URLSearchParams(window.location.search);

// referencias de jquery
var nombre = params.get('nombre')
var sala = params.get('sala')
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

function renderizarUsuarios (personas) {
    var newHTML = '';

    newHTML += '<li>';
    newHTML += '<a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('sala') +'</span></a>';
    newHTML += '</li>';


    for(var i=0; i<personas.length; i++){
        newHTML += '<li>';
        newHTML += '    <a data-id="'+ personas[i].id  +'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ personas[i].nombre +'<small class="text-success">online</small></span></a>';
        newHTML += '</li>';
    }

    divUsuarios.html(newHTML);
}

// renderizar mensajes

function renderizarMensajes(mensaje, yo) {
    var mensajeHTML = '';

    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === "Administrador") {
        adminClass = 'danger'
    }

    if (!yo) {
        mensajeHTML += '<li class="animated fadeIn">';
        if (mensaje.nombre !== "Administrador"){
            mensajeHTML += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        mensajeHTML += '    <div class="chat-content">';
        mensajeHTML += '        <h5>'+ mensaje.nombre +'</h5>';
        mensajeHTML += '        <div class="box bg-light-'+adminClass+'">'+ mensaje.mensaje +'</div>';
        mensajeHTML += '    </div>';
        mensajeHTML += '    <div class="chat-time">'+ hora +'</div>';
        mensajeHTML += '</li>';

    } else {

        mensajeHTML += '<li class="reverse">';
        mensajeHTML += '    <div class="chat-content">';
        mensajeHTML += '        <h5>'+ mensaje.nombre +'</h5>';
        mensajeHTML += '        <div class="box bg-light-inverse">'+ mensaje.mensaje +'</div>';
        mensajeHTML += '    </div>';
        mensajeHTML += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        mensajeHTML += '    <div class="chat-time">'+ hora +'</div>';
        mensajeHTML += '</li>';

    }

    divChatbox.append(mensajeHTML);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// Listeners

divUsuarios.on('click', 'a', function(){
    var id = $(this).data('id');
    if (id) {

        console.log(id);
    }
});

formEnviar.on('submit', function(e){
    e.preventDefault();
    
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val(),
        sala: sala
    }, function(resp) {
        txtMensaje.val('').focus();
        renderizarMensajes(resp, true);
        scrollBottom();
    });
})