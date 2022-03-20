import db from "../database/mysql.js";

import{DataTypes} from "sequelize";

const ChatModel = db.define('Chats', {
    nombre_usuario_emisor: {type: DataTypes.STRING},
    nombre_usuario_receptor: {type: DataTypes.STRING},
    mensaje: {type: DataTypes.STRING},
    fecha_envio: {type: DataTypes.DATE},
})

export default ChatModel