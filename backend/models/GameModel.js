const db = require("../database/mysql.js")
const DataTypes = require("sequelize")

const JuegoModel = db.define('Juegos', {
    titulo: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    genero: {type: DataTypes.STRING},
    valoracion: {type: DataTypes.DOUBLE},
    imagen: {type: DataTypes.STRING},
    video: {type: DataTypes.STRING}
})

module.exports = JuegoModel