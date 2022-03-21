import express from "express"
import socket from "./sockets/sockets.js"

const app = express()
app.set('port', process.env.PORT || 5000)

socket(app.get('port'))