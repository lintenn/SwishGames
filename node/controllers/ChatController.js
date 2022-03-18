import ChatModel from "../models/ChatModel.js";

export const getAllMessages = async (req, res) => {
    try {
        const chats = await ChatModel.findAll()
        res.json(chats)
    } catch(error) {
        res.json({message: error.message})
    }
}

export const getMessage = async (req, res) => {
    try {
        const chat = await ChatModel.findAll({
            where:{ id:req.params.id }
        })
        res = chat
    } catch(error) {
        res.json({message: error.message})
    }
}

export const createMessage = async (req, res) => {
    try {
        await ChatModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

export const updateMessage = async (req, res) => {
    try {
        await ChatModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro actualizado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

export const deleteMessage = async (req, res) => {
    try {
        await ChatModel.destroy({
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}