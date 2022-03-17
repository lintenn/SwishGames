import UserModel from "../models/UserModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.json(users)
    } catch(error) {
        res.json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({
            where:{ id:req.params.id }
        })
        res = user
    } catch(error) {
        res.json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        await UserModel.update({
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro actualizado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        await UserModel.destroy({
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}