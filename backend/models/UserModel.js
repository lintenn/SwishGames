const db = require( '../database/mysql.js' );
const DataTypes = require( 'sequelize' );

const UserModel = db.define( 'Usuarios', {
  nombre: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  fecha_nacimiento: { type: DataTypes.DATE },
  fecha_creacion: { type: DataTypes.DATE },
  password: { type: DataTypes.STRING },
  privacidad: { type: DataTypes.BOOLEAN },
  online: { type: DataTypes.BOOLEAN }
});

module.exports = UserModel;
