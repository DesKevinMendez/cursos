const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback)=>{

        let siguiente = ticketcontrol.siguienteTicket();

        callback(siguiente)
    })


    client.emit('estadoActual', {
        actual: ticketcontrol.getUltimonoTicket(),
        ultimos4: ticketcontrol.getUltimos4()
    });

    client.on('atenderTicket', (data, callback)=>{

        if (!data.escritorio) {
            return callback({
                err: true, 
                mensaje: "El escritorio es necesario",
            })
        }

        let atender = ticketcontrol.atenderTicket(data.escritorio);

        callback(atender);

        // actualizar // notificar cambios en los ultimos 4

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketcontrol.getUltimos4(),
        })
    })
});