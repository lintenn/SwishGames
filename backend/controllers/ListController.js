const ListModel = require("../models/ListModel.js")
const ContentsListsModel = require("../models/ContentsListsModel.js")
const GroupModel = require("../models/GroupModel.js")
const { Op, Sequelize } = require("sequelize")
const db = require("../database/mysql.js");

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
            where: { nombre_usuario: req.params.nombre_usuario }
        });
        res.json(Lists);
        
    } catch (error) {
        
        res.json({ message: error.message });
        
    }
        
};

const getListsByUserAndGame = async (req, res) => {

    try {

        const Lists = await db.query(`SELECT L.id, L.nombre_usuario, L.nombre, L.createdAt, L.updatedAt
        FROM Listas L JOIN ContenidosListas C ON L.id = C.id_lista
        WHERE L.nombre_usuario = '${req.params.nombre_usuario}' AND C.id_juego = ${req.params.id_juego}`, { type: Sequelize.QueryTypes.SELECT });
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

const getSearchedListByUser = async (req, res) => {

    try {

        const Lists = await ListModel.findAll({
            where: { nombre_usuario: req.params.nombre_usuario, nombre: { [Op.like]: `%${req.params.nombre}%` } }
        });
        res.json(Lists);

    } catch (error) {

        res.json({ message: error.message });

    }

};

const createList = async (req, res) => {
        
    try {
            
        const List = await ListModel.create( req.body );
        res.json(List);
            
    } catch (error) {
            
        res.json({ message: error.message });
            
    }
            
};

const updateList = async (req, res) => {
            
    try {
                
        const List = await ListModel.update({
            nombre_usuario: req.body.nombre_usuario,
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
    getListsByUserAndGame,
    getList,
    getSearchedList,
    getSearchedListByUser,
    createList,
    updateList,
    deleteList
}