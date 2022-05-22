const db = require("../database/mysql.js")
const DataTypes = require("sequelize")

const RatingModel = db.define('Valoraciones', {
    id_usuario: {type: DataTypes.INTEGER},
    id_juego: {type: DataTypes.INTEGER},
    valoracion: {type : DataTypes.INTEGER}
})

module.exports = RatingModel