const db = require("../database/mysql.js")
const DataTypes = require("sequelize")


const ContentsListsModel = db.define('ContenidosListas', {
    id_lista: {type: DataTypes.INTEGER},
    id_juego: {type: DataTypes.INTEGER}
})

module.exports = ContentsListsModel