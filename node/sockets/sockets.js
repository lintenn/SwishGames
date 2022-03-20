import { Server } from "socket.io"

const socket = (port) => {
    const io = new Server(port)

    io.on('connection', socket => {

        let nombre;

        socket.on('conectado', (nomb) => {
            nombre = nomb
            socket.broadcast.emit('mensajes')
        })
    
        socket.on('mensaje', () => {
            io.emit('mensajes')
        })
    
        socket.on('disconnect', () => {
            io.emit('mensajes', {server: 'Servidor', mensaje: `${nombre} ha abandonado la sala`})
        })
    })
}

export default socket