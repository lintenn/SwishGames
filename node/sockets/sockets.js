import { Server } from "socket.io"

const socket = (port) => {
    const io = new Server(port)

    io.on('connection', socket => {

        let nombre;

        socket.on('conectado', (nomb) => {
            nombre = nomb
            socket.broadcast.emit('mensajes', {nombre: nombre, mensaje: `${nombre} ha entrado en la sala del chat`})
        })
    
        socket.on('mensaje', (nombre, mensaje) => {
            io.emit('mensajes', {nombre, mensaje})
        })
    
        socket.on('disconnect', () => {
            io.emit('mensajes', {server: 'Servidor', mensaje: `${nombre} ha abandonado la sala`})
        })
    })
}

export default socket