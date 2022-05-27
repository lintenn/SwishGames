const ReviewModel = require("../models/ReviewModel.js")
const { Op, Sequelize } = require("sequelize")
const db = require("../database/mysql.js");

const gettAllReviews = async (req, res) => {

    try {

        const Ratings = await db.query(`SELECT * FROM Reviews `, { type: Sequelize.QueryTypes.SELECT });
        res.json(Ratings);

    } catch (error){

        res.json({message: error.message})

    }
};

const getReviewsByGame = async(req, res) => {

    try{

        const Ratings = await db.query(`SELECT R.id_usuario, R.review, R.recomendado FROM Reviews R WHERE R.id_juego = ${req.params.id_juego} `, { type: Sequelize.QueryTypes.SELECT });
        res.json(Ratings)
    } catch (error){

        res.json({ message: error.message });

    }

};

const getReviewsByUserAndGame = async(req, res) => {

    try{

        const Ratings = await db.query(`SELECT R.review, R.recomendado FROM Reviews R WHERE R.id_usuario = ${req.params.id_usuario} AND R.id_juego = ${req.params.id_juego}`, { type: Sequelize.QueryTypes.SELECT });
        res.json(Ratings)
    } catch (error){

        res.json({ message: error.message });

    }

};

const createReview = async (req, res) => {

    try{

        await db.query(`INSERT INTO Reviews (id_usuario, id_juego, review, recomendado) VALUES (${req.body.id_usuario}, ${req.body.id_juego}, ${req.body.review}, ${req.body.recomendado})`, { type: Sequelize.QueryTypes.INSERT });
        res.json({ message: "Review creada correctamente" });

    } catch( error ){

        res.json({ message: error.message })

    }

};

const updateReview = async (req, res) => {

    try{

        await db.query(`UPDATE Reviews SET review = ${req.body.review}, recomendado = ${req.body.recomendado} WHERE id_usuario = ${req.params.id_usuario} AND id_juego = ${req.params.id_juego}`, { type: Sequelize.QueryTypes.UPDATE });
        res.json({ message: "Review actualizada correctamente" });

    } catch (error) {

        res.json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {

    try{

        await db.query(`DELETE FROM Reviews WHERE id_usuario = ${req.params.id_usuario} AND id_juego = ${req.params.id_juego}`, { type: Sequelize.QueryTypes.DELETE })
        res.json({ message: "Review eliminada correctamente" });

    } catch (error) {

        res.json({ message: error.message });

    }

}

module.exports = {
    gettAllReviews,
    getReviewsByGame,
    getReviewsByUserAndGame,
    createReview,
    updateReview,
    deleteReview
}