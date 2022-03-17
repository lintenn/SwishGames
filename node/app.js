import express from "express"
import cors from 'cors'
import db from "./database/mysql.js"
import userRoutes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users',userRoutes)

try{
    await db.authenticate()
}catch{

}

app.listen(8000, ()=>{
    console.log('Server UP, running in http://localhost:8000/')
})