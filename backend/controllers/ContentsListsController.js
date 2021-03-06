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

const getSearchedContentsListsByList = async (req, res) => {

    try {

        const ContentsLists = await db.query(`SELECT J.id, J.titulo, J.descripcion, J.genero, J.valoracion, J.imagen, J.createdAt, J.updatedAt
        FROM ContenidosListas C JOIN Juegos J ON C.id_juego = J.id
        WHERE C.id_lista = ${req.params.id_lista} AND J.titulo LIKE '%${req.params.titulo}%'`, { type: Sequelize.QueryTypes.SELECT });
        res.json(ContentsLists);

    } catch (error) {

        res.json({ message: error.message });

    }

};    

const getFavoritesContentsListsByUser = async (req, res) => {

    try {

        console.log(req.params.nombre_usuario);
        const ContentsLists = await db.query(`SELECT J.id, J.titulo, J.descripcion, J.genero, J.valoracion, J.imagen, J.createdAt, J.updatedAt
        FROM ContenidosListas C JOIN Juegos J ON C.id_juego = J.id
        JOIN Listas L ON C.id_lista = L.id
        WHERE L.nombre_usuario = '${req.params.nombre_usuario}'
        AND L.id = (SELECT MIN(id) FROM Listas WHERE nombre_usuario=L.nombre_usuario)`, { type: Sequelize.QueryTypes.SELECT });
        res.json( ContentsLists );

    } catch (error) {

        res.json({ message: error.message });

    }

};

const getFavoritesCountByUser = async (req, res) => {

    try {

        console.log(req.params.nombre_usuario);
        const ContentsLists = await db.query(`SELECT J.id
        FROM ContenidosListas C JOIN Juegos J ON C.id_juego = J.id
        JOIN Listas L ON C.id_lista = L.id
        WHERE L.nombre_usuario = '${req.params.nombre_usuario}'
        AND L.id = (SELECT MIN(id) FROM Listas WHERE nombre_usuario=L.nombre_usuario)`, { type: Sequelize.QueryTypes.SELECT });
        res.json( ContentsLists );

    } catch (error) {

        res.json({ message: error.message });

    }

};


const createContentsLists = async (req, res) => {
        
    try {
        
        //await ContentsListsModel.create(req.body);
        await db.query(`INSERT INTO ContenidosListas (id_lista, id_juego) VALUES (${req.body.id_lista}, ${req.body.id_juego})`, { type: Sequelize.QueryTypes.INSERT });
        res.json({ message: "Lista creada correctamente" });
        
    } catch (error) {
        
        res.json({ message: error.message });
        
    }
        
};

const updateContentsLists = async (req, res) => {
            
    try {
            
        /*await ContentsListsModel.update(req.body, {
            where: { id: req.params.id }
        });*/
        await db.query(`UPDATE ContenidosListas SET id_lista = ${req.body.id_lista}, id_juego = ${req.body.id_juego} WHERE id = ${req.params.id}`, { type: Sequelize.QueryTypes.UPDATE });
        res.json({ message: "Lista actualizada correctamente" });
            
    } catch (error) {
            
        res.json({ message: error.message });
            
    }
            
};

const deleteContentsLists = async (req, res) => {
                    
    try {
                    
        /*await ContentsListsModel.destroy({
            where: { id_lista: req.params.id_lista, id_juego: req.params.id_juego }
        });*/
        await db.query(`DELETE FROM ContenidosListas WHERE id_lista = ${req.params.id_lista} AND id_juego = ${req.params.id_juego}`, { type: Sequelize.QueryTypes.DELETE });
        res.json({ message: "Lista eliminada correctamente" });
                    
    } catch (error) {
                    
        res.json({ message: error.message });
                    
    }
                
};

module.exports = {
    getAllContentsLists,
    getContentsListsByList,
    getSearchedContentsListsByList,
    getFavoritesContentsListsByUser,
    getFavoritesCountByUser,
    createContentsLists,
    updateContentsLists,
    deleteContentsLists
}