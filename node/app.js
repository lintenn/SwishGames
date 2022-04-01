const express = require('express')
const http = require('http');
const cors = require('cors')
const db = require("./database/mysql.js")
const userRoutes = require('./routes/routesUser.js')
const chatRoutes = require('./routes/routesChat.js')
const gamesRoutes = require('./routes/routesGame.js')
const groupRoutes = require('./routes/routesGroup.js')
const socketio = require('socket.io');

const app = express()
const server = http.createServer(app);

const io = socketio(server);

app.use(cors())
app.use(express.json())
app.use('/users',userRoutes)
app.use('/chats',chatRoutes)
app.use('/games',gamesRoutes)
app.use('/groups',groupRoutes)

try{
    db.connect()
}catch{

}

app.set('port', process.env.PORT || 8000)

require('./socket/socket.js')(io)

server.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
})