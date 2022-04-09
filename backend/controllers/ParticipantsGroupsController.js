const ParticipantsGroupsModel = require( '../models/ParticipantsGroupsModel.js' );
const { Op } = require( 'sequelize' );

const getAllParticipantsGroups = async ( req, res ) => {

  try {

    const ParticipantsGroups = await ParticipantsGroupsModel.findAll();
    res.json( ParticipantsGroups );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getParticipantsGroups = async ( req, res ) => {

  try {

    const ParticipantsGroups = await ParticipantsGroupsModel.findAll({
      where: { id: req.params.id }
    });
    res.json( ParticipantsGroups );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const createParticipantsGroups = async ( req, res ) => {

  try {

    await ParticipantsGroupsModel.create( req.body );
    res.json({ message: '¡Registro creado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const updateParticipantsGroups = async ( req, res ) => {

  try {

    await ParticipantsGroupsModel.update( req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro actualizado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const deleteParticipantsGroups = async ( req, res ) => {

  try {

    await ParticipantsGroupsModel.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: '¡Registro borrado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

module.exports = { getAllParticipantsGroups, getParticipantsGroups,  createParticipantsGroups, updateParticipantsGroups, deleteParticipantsGroups };