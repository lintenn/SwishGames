import db from "../database/mysql.js";

import{DataTypes} from "sequelize";

const JuegoModel = db.define('Juegos', {
    nombre: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    titulo: {type: DataTypes.STRING},
    genero: {type: DataTypes.STRING},
    valoracion: {type: DataTypes.DOUBLE}
})

export default JuegoModel