const { io } = require('../server');

const {Usuarios} = require('./../classes/usuarios');
const { crearMensaje } = require('./../utils/utilidades');
const usuarios = new Usuarios(); 

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensajes: "El nombre / sala es necesario"
            })
        }
        client.join(data.sala);

        // sacar el id del socket

        let idSocket = client.id;

        usuarios.agregarPersonas(idSocket, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersonas', 
            usuarios.getPersonasPorSala(data.sala));

        client.broadcast.to(data.sala)
        .emit('crearMensaje', crearMensaje('Administrador', `${
            data.nombre
        } se unio`))

        callback(usuarios.getPersonasPorSala(data.sala))
    });


    client.on('crearMensaje', (data, callback) => {

        let person = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(person.nombre, data.mensaje);

        client.broadcast.to(person.sala).emit('crearMensaje', mensaje);

        callback(mensaje);

    });

    client.on('disconnect', ()=> {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala)
            .emit('crearMensaje', crearMensaje('Administrador', `${
                personaBorrada.nombre
            } salió`))

        client.broadcast.to(personaBorrada.sala)
            .emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));

    })

    // mensajes privados 
    client.on('mensajePrivado', data => {
        // if (!data.id) {

        // }

        let persona = usuarios.getPersona(client.id);
        // Enviar un mensaje solo una persona
        // para enviar un mensaje a un usuario en particular, se debe de poner to(#aqui va el id 
        // de socket del usuario a quien se le quiere enviar un mensaje privado )
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

});