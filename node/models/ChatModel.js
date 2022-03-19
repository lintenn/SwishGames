import db from "../database/mysql.js";

import{DataTypes} from "sequelize";

const UserModel = db.define('Chats', {
    nombre_usuario: {type: DataTypes.STRING},
    mensaje: {type: DataTypes.STRING},
    fecha_envio: {type: DataTypes.STRING},
})

export default UserModel