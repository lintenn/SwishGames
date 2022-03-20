import db from "../database/mysql.js";

import{DataTypes} from "sequelize";

const JuegoModel = db.define('Juegos', {
    titulo: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING},
    genero: {type: DataTypes.STRING},
    valoracion: {type: DataTypes.DOUBLE}
})

export default JuegoModel