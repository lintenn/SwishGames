const ContentsListsModel = require("../models/ContentsListsModel.js")
const GameController = require("../controllers/GameController.js")
const { Op, Sequelize } = require("sequelize")

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
            
        const ContentsLists = await ContentsListsModel.findAll({
            where: { id_lista: req.params.id_lista }
        });
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