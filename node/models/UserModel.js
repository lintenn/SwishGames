import db from "../database/mysql.js";

import{DataTypes} from "sequelize";

const UserModel = db.define('Usuarios', {
    nombre: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    fecha_nacimiento: {type: DataTypes.DATE},
    fecha_creacion: {type: DataTypes.DATE},
    password: {type: DataTypes.STRING},
    privacidad: {type: DataTypes.BOOLEAN}
})

export default UserModel