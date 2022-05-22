const RatingModel = require("../models/RatingModel.js")
const { Op, Sequelize } = require("sequelize")
const db = require("../database/mysql.js");

const gettAllRatings = async (req, res) => {

    try {

        const Ratings = await RatingModel.findAll();
        res.json(Ratings);

    } catch (error){

        res.json({message: error.message})

    }
};

const getRatingsByGame = async(req, res) => {

    try{

        const Ratings = await db.query(`SELECT V.valoracion FROM Valoraciones WHERE J.id_juego = ${req.params.id_juego} `, { type: Sequelize.QueryTypes.SELECT });
        res.json(Ratings)
    } catch (error){

        res.json({ message: error.message });

    }

};

const getRatingsByUser = async(req, res) => {

    try{

        const Ratings = await db.query(`SELECT V.valoracion FROM Valoraciones WHERE J.id_usuario = ${req.params.id_usuario} `, { type: Sequelize.QueryTypes.SELECT });
        res.json(Ratings)
    } catch (error){

        res.json({ message: error.message });

    }

};

const createRating = async (req, res) => {

    try{

        await db.query(`INSERT INTO Valoraciones (id_usuario, id_juego) VALUES (${req.body.id_usuario}, ${req.body.id_usuario})`, { type: Sequelize.QueryTypes.INSERT });
        res.json({ message: "Lista creada correctamente" });

    } catch( error ){

        res.json({ message: error.message })

    }

};

const updateRating = async (req, res) => {

    try{

        await db.query(`UPDATE Valoraciones SET valoracion = ${req.body.valoracion} WHERE id_usuario = ${req.params.id_usuario} AND id_juego = ${req.params.id_juego}`, { type: Sequelize.QueryTypes.UPDATE });
        res.json({ message: "Lista actualizada correctamente" });

    } catch (error) {

        res.json({ message: error.message });
    }
};

const deleteRating = async (req, res) => {

    try{

        await db.query(`DELETE FROM Valoraciones WHERE id_usuario = ${req.params.id_usuario} AND id_juego = ${req.params.id_juego}`, { type: Sequelize.QueryTypes.DELETE })
        res.json({ message: "Lista eliminada correctamente" });

    } catch (error) {

        res.json({ message: error.message });

    }

};

module.exports = {
    gettAllRatings,
    getRatingsByGame, 
    getRatingsByUser,
    createRating,
    updateRating,
    deleteRating
}