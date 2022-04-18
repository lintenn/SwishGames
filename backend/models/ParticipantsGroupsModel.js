const db = require("../database/mysql.js")
const DataTypes = require("sequelize")
const GroupModel = require("./GroupModel.js")

const ParticipantsGroupsModel = db.define('ParticipantesGrupos', {
    id_grupo: {type: DataTypes.INTEGER},
    nombre_usuario: {type: DataTypes.STRING},
    fecha_union: {type: DataTypes.DATE}
})


//associate ParticipantsGroupsModel with GroupModel
ParticipantsGroupsModel.belongsTo(GroupModel, {foreignKey: 'id_grupo'})

module.exports = ParticipantsGroupsModel