const db = require("../database/mysql.js")
const DataTypes = require("sequelize")

const ChatModel = db.define('Chats', {
    nombre_usuario_emisor: {type: DataTypes.STRING},
    nombre_usuario_receptor: {type: DataTypes.STRING},
    id_grupo_receptor: {type: DataTypes.INTEGER},
    mensaje: {type: DataTypes.STRING},
    fecha_envio: {type: DataTypes.DATE},
    administracion: {type: DataTypes.BOOLEAN},
    reenviado: {type: DataTypes.BOOLEAN}
})

module.exports = ChatModel