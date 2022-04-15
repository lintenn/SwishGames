const ContentsListsModel = require("../models/ContentsListsModel.js")
const GameController = require("../controllers/GameController.js")
const { Op, Sequelize } = require("sequelize")
const db = require("../database/mysql.js");

const getAllContentsLists = async (req, res) => {
    
    try {
    
     const ContentsLists = await ContentsListsModel.findAll();
     res.json(ContentsLists);
    
    } catch (error) {
    
     res.json({ message: error.message });
    
    }
    
};

const getContentsListsByList = async (req, res) => {
        
    try {
            
        /* const ContentsLists = await ContentsListsModel.findAll({
            where: { id_lista: req.params.id_lista }
        }); */
        const ContentsLists = await db.query(`SELECT J.id, J.titulo, J.descripcion, J.genero, J.valoracion, J.imagen, J.createdAt, J.updatedAt
        FROM ContenidosListas C JOIN Juegos J ON C.id_juego = J.id
        WHERE C.id_lista = ${req.params.id_lista}`, { type: Sequelize.QueryTypes.SELECT });
        res.json(ContentsLists);
            
    } catch (error) {
            
        res.json({ message: error.message });
            
    }
            
};

const createContentsLists = async (req, res) => {
        
    try {
        
        await ContentsListsModel.create(req.body);
        res.json({ message: "Lista creada correctamente" });
        
    } catch (error) {
        
        res.json({ message: error.message });
        
    }
        
};

const updateContentsLists = async (req, res) => {
            
    try {
            
        await ContentsListsModel.update(req.body, {
            where: { id: req.params.id }
        });
        res.json({ message: "Lista actualizada correctamente" });
            
    } catch (error) {
            
        res.json({ message: error.message });
            
    }
            
};

const deleteContentsLists = async (req, res) => {
                    
    try {
                    
        await ContentsListsModel.destroy({
            where: { id: req.params.id }
        });
        res.json({ message: "Lista eliminada correctamente" });
                    
    } catch (error) {
                    
        res.json({ message: error.message });
                    
    }
                
};

module.exports = {
    getAllContentsLists,
    getContentsListsByList,
    createContentsLists,
    updateContentsLists,
    deleteContentsLists
}