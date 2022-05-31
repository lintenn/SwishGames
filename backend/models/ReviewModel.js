const db = require("../database/mysql.js")
const DataTypes = require("sequelize")

const ReviewModel = db.define('Reviews', {
    id_usuario: {type: DataTypes.INTEGER},
    id_juego: {type: DataTypes.INTEGER},
    review: {type : DataTypes.STRING},
    recomendado: {type : DataTypes.BOOLEAN}
})

module.exports = ReviewModel