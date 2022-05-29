const ParticipantsGroupsModel = require( '../models/ParticipantsGroupsModel.js' );
const { Op, Sequelize } = require( 'sequelize' );
const db = require("../database/mysql.js")

const getGroupsByNameUser = async ( req, res ) => {

  try {

    const UsersByGroups = await db.query(`Select g.* from Grupos g, ParticipantesGrupos p where p.nombre_usuario = '${req.params.nombre_usuario}' and p.id_grupo= g.id`, { type: Sequelize.QueryTypes.SELECT });

    res.json( UsersByGroups );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getUsersByGroups = async ( req, res ) => {

  try {

    const UsersByGroups = await db.query(`Select u.* from Usuarios u, ParticipantesGrupos p where p.nombre_usuario = u.nombre and p.id_grupo=${req.params.id_grupo} order by u.nombre`, { type: Sequelize.QueryTypes.SELECT });

    res.json( UsersByGroups );

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

const getNotUsersByGroups = async ( req, res ) => {

  try {

    const UsersByGroups = await db.query(`SELECT u.* FROM Usuarios u where u.nombre not in (SELECT u.nombre FROM ParticipantesGrupos p, Usuarios u WHERE p.id_grupo=${req.params.id_grupo} and u.nombre=p.nombre_usuario) order by u.nombre`, { type: Sequelize.QueryTypes.SELECT });

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

const deleteParticipantsGroupsByGroupAndUser = async ( req, res ) => {

  try {

    await ParticipantsGroupsModel.destroy({
      where: { id_grupo: req.params.id_grupo,
               nombre_usuario: req.params.nombre_usuario }
    });
    res.json({ message: '¡Registro borrado correctamente!' });

  } catch ( error ) {

    res.json({ message: error.message });

  }

};

module.exports = { getGroupsByNameUser, getUsersByGroups, getNotUsersByGroups,  createParticipantsGroups, updateParticipantsGroups, deleteParticipantsGroups, deleteParticipantsGroupsByGroupAndUser };