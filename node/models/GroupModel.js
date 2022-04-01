const db = require("../database/mysql.js")
const DataTypes = require("sequelize")

const GroupModel = db.define('Grupos', {
    nombre: {type: DataTypes.STRING},
    imagen: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    fecha_creacion: {type: DataTypes.DATE}
})

module.exports = GroupModel