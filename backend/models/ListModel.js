const db = require("../database/mysql.js")
const DataTypes = require("sequelize")


const ListModel = db.define('Listas', {
    id_usuario: {type: DataTypes.INTEGER},
    nombre: {type: DataTypes.STRING}
})

module.exports = ListModel