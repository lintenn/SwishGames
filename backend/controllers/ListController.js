const ListModel = require("../models/ListModel.js")
const ContentsListsModel = require("../models/ContentsListsModel.js")
const GroupModel = require("../models/GroupModel.js")
const { Op } = require("sequelize")


const getAllLists = async (req, res) => {
    
    try {
    
     const Lists = await ListModel.findAll();
     res.json(Lists);
    
    } catch (error) {
    
     res.json({ message: error.message });
    
    }
    
};

const getListsByUser = async (req, res) => {
    
    try {
        
        const Lists = await ListModel.findAll({
            where: { id_usuario: req.params.id_user }
        });
        res.json(Lists);
        
    } catch (error) {
        
        res.json({ message: error.message });
        
    }
        
};

const getList = async (req, res) => {
        
    try {
            
        const List = await ListModel.findAll({
            where: { id: req.params.id_list }
        });
        res.json(List);
            
    } catch (error) {
            
        res.json({ message: error.message });
            
    }
            
};

const getSearchedList = async (req, res) => {
        
    try {
        
        const Lists = await ListModel.findAll({
            where: { nombre: { [Op.like]: `%${req.params.nombre}%` } }
        });
        res.json(Lists);
        
    } catch (error) {
        
        res.json({ message: error.message });
        
    }
        
};

const createList = async (req, res) => {
        
    try {
            
        const List = await ListModel.create({
            id_usuario: req.body.id_usuario,
            nombre: req.body.nombre
        });
        res.json(List);
            
    } catch (error) {
            
        res.json({ message: error.message });
            
    }
            
};

const updateList = async (req, res) => {
            
    try {
                
        const List = await ListModel.update({
            id_usuario: req.body.id_usuario,
            nombre: req.body.nombre
        }, {
            where: { id: req.params.id_list }
        });
        res.json(List);
                
    } catch (error) {
                
        res.json({ message: error.message });
                
    }
                
};

const deleteList = async (req, res) => {
                
    try {
                    
        const List = await ListModel.destroy({
            where: { id: req.params.id_list }
        });
        res.json(List);
                    
    } catch (error) {
                    
        res.json({ message: error.message });
                    
    }
                    
};

module.exports = {
    getAllLists,
    getListsByUser,
    getList,
    getSearchedList,
    createList,
    updateList,
    deleteList
}