import { io } from "socket.io-client";

let socket = io("//localhost:5000/", { transports : ['websocket'] })

export default socket