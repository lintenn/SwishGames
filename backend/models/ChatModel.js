const db = require("../database/mysql.js")
const DataTypes = require("sequelize")

const ChatModel = db.define('Chats', {
    nombre_usuario_emisor: {type: DataTypes.STRING},
    nombre_usuario_receptor: {type: DataTypes.STRING},
    id_grupo_receptor: {type: DataTypes.INTEGER},
    mensaje: {type: DataTypes.STRING},
    fecha_envio: {type: DataTypes.DATE},
    administracion: {type: DataTypes.BOOLEAN},
    editado: {type: DataTypes.BOOLEAN},
    reenviado: {type: DataTypes.BOOLEAN},
    respuesta: {type: DataTypes.INTEGER},
    mensajeRespuesta: {type: DataTypes.STRING},
    nombreEmisorRespuesta: {type: DataTypes.STRING}
})

module.exports = ChatModel