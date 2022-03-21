import { io } from "socket.io-client";

//const URI = 'https://swishgames-socketio.herokuapp.com/'
const URI = 'ws://localhost:5000'

let socket = io(URI, { transports : ['websocket'] })

export default socket