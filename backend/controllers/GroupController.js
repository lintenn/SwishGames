const GroupModel = require( '../models/GroupModel.js' );
const { Op } = require( 'sequelize' );

const getAllGroups = async ( req, res ) => {

  try {

    const Groups = await GroupModel.findAll();
    res.json( Groups );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getGroup = async ( req, res ) => {

  try {

    const Group = await GroupModel.findAll({
      where: { id: req.params.id }
    });
    res.json( Group );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const createGroup = async ( req, res ) => {

  try {

    await GroupModel.create( req.body );
    res.json({ message: '¡Registro creado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const updateGroup = async ( req, res ) => {

  try {

    await GroupModel.update( req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro actualizado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const deleteGroup = async ( req, res ) => {

  try {

    await GroupModel.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro borrado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

module.exports = { getAllGroups, getGroup,  createGroup, updateGroup, deleteGroup };