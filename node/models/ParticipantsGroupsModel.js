const db = require("../database/mysql.js")
const DataTypes = require("sequelize")

const ParticipantsGroupsModel = db.define('ParticipantesGrupos', {
    id_grupo: {type: DataTypes.INTEGER},
    nombre_usuario: {type: DataTypes.STRING}
})

module.exports = ParticipantsGroupsModel