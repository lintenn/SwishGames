const UserModel = require( '../models/UserModel.js' );
const { Op } = require( 'sequelize' );

const getAllUsers = async ( req, res ) => {

  try {

    const users = await UserModel.findAll({
      order: [['nombre', 'ASC']]
    });
    res.json( users );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getUser = async ( req, res ) => {

  try {

    const user = await UserModel.findAll({
      where: { id: req.params.id }
    });
    res.json( user );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getUserByName = async ( req, res ) => {

  try {

    const user = await UserModel.findAll({
      where: { nombre: req.params.nombre }
    });
    res.json( user[0]);

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getUsersByName = async ( req, res ) => {

  try {

    const user = await UserModel.findAll({
      where: { nombre: { [Op.like]: `%${req.params.nombre}%` } }
    });
    res.json( user );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const createUser = async ( req, res ) => {

  try {

    await UserModel.create( req.body );
    res.json({ message: '┬íRegistro creado correctamente!' });

  } catch ( error ) {

    res.status(400).json({ message: error.message });

  }

};

const updateUser = async ( req, res ) => {

  try {

    await UserModel.update( req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: '┬íRegistro actualizado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const updateConnectionUserByName = async ( req, res ) => {

  try {

    await UserModel.update( req.body, {
      where: { nombre: req.params.name }
    });
    res.json({ message: '┬íRegistro actualizado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const deleteUser = async ( req, res ) => {

  try {

    await UserModel.destroy({
      where: { id: req.params.id }
    }).then((deletedUser) => {
      
      if (deletedUser) {
        res.status(204).json({ message: '┬íRegistro borrado correctamente!' });
      } else {
        res.status(400).json({ message: 'Trying to delete non existing user!' });
      }

    });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const deleteAllUser = async ( req, res ) => {

  try {

    await UserModel.destroy({
      where: {}
    });
    res.json({ message: '┬íRegistro borrado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

module.exports = { getAllUsers, getUser, getUserByName, getUsersByName, createUser, updateConnectionUserByName, updateUser, deleteUser, deleteAllUser };
