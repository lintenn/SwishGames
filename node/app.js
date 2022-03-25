import express from "express"
import cors from 'cors'
import db from "./database/mysql.js"
import userRoutes from './routes/routesUser.js'
import chatRoutes from './routes/routesChat.js'
import gamesRoutes from './routes/routesGame.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users',userRoutes)
app.use('/chats',chatRoutes)
app.use('/games',gamesRoutes)

try{
    await db.authenticate()
}catch{

}

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
})