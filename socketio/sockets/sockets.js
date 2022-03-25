import { Server } from "socket.io"
import axios from 'axios'

const socket = (port) => {
    const io = new Server(port)

    io.on('connection', socket => {

        let nombre;
        const URIUsers = 'http://localhost:8000/users/'
        //const URIUsers = 'https://swishgames-backend.herokuapp.com/users/'

        socket.on('conectado', (nomb) => {
            nombre = nomb
            axios.put(URIUsers+"connection/"+nombre, {
                online: true
            })
            io.emit('mensajes')
        })
    
        socket.on('mensaje', () => {
            io.emit('mensajes')
        })
    
        socket.on('disconnect', () => {
            axios.put(URIUsers+"connection/"+nombre, {
                online: false
            })
            io.emit('mensajes')
        })
    })
}

export default socket