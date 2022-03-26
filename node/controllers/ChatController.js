const ChatModel = require("../models/ChatModel.js")
const Op = require("sequelize")

const getAllMessages = async (req, res) => {
    try {
        const chats = await ChatModel.findAll()
        res.json(chats)
    } catch(error) {
        res.json({message: error.message})
    }
}

const getAllMessagesOrderByDate = async (req, res) => {
    try {
        const chats = await ChatModel.findAll({
            order:[['fecha_envio', 'DESC']]
        })
        res.json(chats)
    } catch(error) {
        res.json({message: error.message})
    }
}

const getAllMessagesOfOnePerson = async (req, res) => {
    try {
        const chats = await ChatModel.findAll({
            where: {[Op.or]: [
                         {nombre_usuario_receptor:req.params.nombre_usuario_receptor,
                            nombre_usuario_emisor:req.params.nombre_usuario_emisor} ,
                         {nombre_usuario_emisor:req.params.nombre_usuario_receptor,
                            nombre_usuario_receptor:req.params.nombre_usuario_emisor} 
            ]}
            
            
        })
        res.json(chats)
    } catch(error) {
        res.json({message: error.message})
    }
}


const getAllMessagesOfOnePersonOrderByDate = async (req, res) => {
    try {
        const chats = await ChatModel.findAll({
            where: {[Op.or]: [
                         {nombre_usuario_receptor:req.params.nombre_usuario_receptor,
                            nombre_usuario_emisor:req.params.nombre_usuario_emisor} ,
                         {nombre_usuario_emisor:req.params.nombre_usuario_receptor,
                            nombre_usuario_receptor:req.params.nombre_usuario_emisor} 
            ]},
            order:[['fecha_envio', 'DESC']]
            
        })
        res.json(chats)
    } catch(error) {
        res.json({message: error.message})
    }
}

const getMessage = async (req, res) => {
    try {
        const chat = await ChatModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(chat)
    } catch(error) {
        res.json({message: error.message})
    }
}

const createMessage = async (req, res) => {
    try {
        await ChatModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

const updateMessage = async (req, res) => {
    try {
        await ChatModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro actualizado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

const deleteMessage = async (req, res) => {
    try {
        await ChatModel.destroy({
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

module.exports = {getAllMessages, getAllMessagesOfOnePerson, getAllMessagesOfOnePersonOrderByDate, getAllMessagesOrderByDate, getMessage, createMessage, updateMessage, deleteMessage}