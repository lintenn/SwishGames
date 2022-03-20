import JuegoModel from "../models/JuegoModel.js";

export const getAllGames = async (req, res) => {
    try {
        const games = await JuegoModel.findAll()
        res.json(games)
    } catch(error) {
        res.json({message: error.message})
    }
}

export const getGame = async (req, res) => {
    try {
        const game = await JuegoModel.findAll({
            where:{ id:req.params.id }
        })
        res = game
    } catch(error) {
        res.json({message: error.message})
    }
}

export const createGame = async (req, res) => {
    try {
        await JuegoModel.create(req.body)
        res.json({"message":"¡Registro creado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

export const updateGame = async (req, res) => {
    try {
        await JuegoModel.update(req.body, {
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro actualizado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}

export const deleteGame = async (req, res) => {
    try {
        await JuegoModel.destroy({
            where: { id: req.params.id }
        })
        res.json({"message":"¡Registro borrado correctamente!"})
    } catch(error) {
        res.json({message: error.message})
    }
}