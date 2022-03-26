import { io } from 'socket.io-client';

// const URI = 'https://swishgames-socketio.herokuapp.com/'
const URI = 'ws://localhost:8000';

const socket = io( URI, { transports: ['websocket'] });

export default socket;
