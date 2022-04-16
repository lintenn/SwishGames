const ParticipantsGroupsModel = require( '../models/ParticipantsGroupsModel.js' );
const GroupModel = require( '../models/GroupModel' );
const { Op, Sequelize } = require( 'sequelize' );
const db = require("../database/mysql.js")

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

const getGroupsByNameUser = async ( req, res ) => {

  try {

    const ParticipantsGroups = await ParticipantsGroupsModel.findAll({
          where: { 
            nombre_usuario: req.params.nombre_usuario
          }
    });
    const Groups = await GroupModel.findAll();
    const GroupsByNameUser = [];
    ParticipantsGroups.forEach( ( ParticipantsGroup ) => {
      Groups.forEach( ( Group ) => {
        if ( ParticipantsGroup.id_grupo === Group.id ) {
          GroupsByNameUser.push( Group );
        }
      });
    } );

    // do sequelize query Select * from Grupos, ParticipantesGrupos where Grupos.id = ParticipantesGrupos.id_grupo and ParticipantesGrupos.nombre_usuario = 'nombre_usuario'

    //const GroupsByNameUser = await db.query(`Select * from ParticipantesGrupos where nombre_usuario = "${req.params.nombre_usuario}"`, { type: Sequelize.QueryTypes.SELECT });

    res.json( GroupsByNameUser );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getUsersByGroups = async ( req, res ) => {

  try {

    // do sequelize query Select * from Grupos, ParticipantesGrupos where Grupos.id = ParticipantesGrupos.id_grupo and ParticipantesGrupos.nombre_usuario = 'nombre_usuario'

    const UsersByGroups = await db.query(`Select u.* from Usuarios u, ParticipantesGrupos p where p.nombre_usuario = u.nombre and p.id_grupo=${req.params.id_grupo}`, { type: Sequelize.QueryTypes.SELECT });

    res.json( UsersByGroups );

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

module.exports = { getAllParticipantsGroups, getParticipantsGroups, getGroupsByNameUser, getUsersByGroups,  createParticipantsGroups, updateParticipantsGroups, deleteParticipantsGroups };